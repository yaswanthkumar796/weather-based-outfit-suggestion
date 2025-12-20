const axios = require('axios');

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const determineSeason = (month) => {
  if ([12, 1, 2].includes(month)) return 'Winter';
  if ([3, 4, 5].includes(month)) return 'Spring';
  if ([6, 7, 8].includes(month)) return 'Summer';
  return 'Fall';
};

// Helper: Process 5-day/3-hour forecast into daily summaries
// Note: Includes Wind, Humidity, and FeelsLike and AQI aggregation based on target hour
const processForecast = (list, targetHour, pollutionList = []) => {
  const dailyMap = new Map();

  // 1. Group all intervals by Date
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0]; // YYYY-MM-DD
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        date,
        tempMin: 100,
        tempMax: -100,
        intervals: []
      });
    }
    const day = dailyMap.get(date);
    
    // Update daily min/max (always aggregate this)
    day.tempMin = Math.min(day.tempMin, item.main.temp_min);
    day.tempMax = Math.max(day.tempMax, item.main.temp_max);
    
    // Store interval for time selection
    day.intervals.push(item);
  });

  // 2. Select the best interval for each day
  const results = [];
  dailyMap.forEach(day => {
     let bestInterval = day.intervals[0];
     let minDiff = 24;

     // Find the interval closest to targetHour
     day.intervals.forEach(interval => {
         const intervalDate = new Date(interval.dt_txt);
         const intervalHour = intervalDate.getHours();
         
         let diff = Math.abs(targetHour - intervalHour);
         if (diff > 12) diff = 24 - diff; // Handle wrap around if needed

         if (diff < minDiff) {
             minDiff = diff;
             bestInterval = interval;
         }
     });

     // Find best matching AQI for this day/time
     let forecastAqi = null;
     if (pollutionList.length > 0) {
        // Pollution list items have "dt" (unix timestamp). We want match for bestInterval.dt
        // Find pollution item with closest timestamp
        const targetTime = bestInterval.dt;
        let bestPollution = null;
        let minPollutionDiff = Infinity;
        
        pollutionList.forEach(pItem => {
            const diff = Math.abs(pItem.dt - targetTime);
            if (diff < minPollutionDiff) {
                minPollutionDiff = diff;
                bestPollution = pItem;
            }
        });
        
        if (bestPollution) {
            forecastAqi = bestPollution.main.aqi;
        }
     }

     // Construct final day object
     results.push({
        date: day.date,
        tempMin: day.tempMin,
        tempMax: day.tempMax,
        // Snapshot data from best interval
        temp: bestInterval.main.temp, // The requested "temp at that time"
        feelsLike: bestInterval.main.feels_like,
        humidity: bestInterval.main.humidity,
        windSpeed: bestInterval.wind.speed,
        icon: bestInterval.weather[0].icon,
        condition: bestInterval.weather[0].main,
        description: bestInterval.weather[0].description,
        aqi: forecastAqi
     });
  });

  return results;
};

// Helper: Process One Call (8-day) data
const processOneCall = (dailyList) => {
  return dailyList.map(day => ({
    date: new Date(day.dt * 1000).toISOString().split('T')[0],
    tempMin: day.temp.min,
    tempMax: day.temp.max,
    temp: day.temp.day,
    feelsLike: day.feels_like.day,
    humidity: day.humidity,
    windSpeed: day.wind_speed,
    icon: day.weather[0].icon,
    condition: day.weather[0].main,
    description: day.weather[0].description,
    aqi: null // One Call 3.0 doesn't include daily AQI directly in the same list usually, or requires separate call. We'll leave null or fetch if critical.
  }));
};

const getWeatherData = async (query) => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  let lat, lon, cityName, country;

  try {
    // 0. Resolve Coords if City provided
    if (query.city) {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query.city)}&limit=1&appid=${apiKey}`;
      const geoRes = await axios.get(geoUrl);
      if (!geoRes.data || geoRes.data.length === 0) throw new Error('City not found');
      lat = geoRes.data[0].lat;
      lon = geoRes.data[0].lon;
      cityName = geoRes.data[0].name;
      country = geoRes.data[0].country;
    } else if (query.lat && query.lon) {
      lat = query.lat;
      lon = query.lon;
    } else {
      throw new Error('City or Lat/Lon required');
    }

    // Determine current month/season common for both paths
    const currentMonth = new Date().getMonth() + 1;
    let finalResult = {
      location: { city: cityName || "Unknown Location", country: country || "", lat, lon },
      current: {},
      forecast: []
    };

    // 1. Try One Call API (8 Days)
    try {
      // Using One Call 3.0 (or 2.5 if older key). 3.0 is standard now.
      const oneCallUrl = `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;
      const response = await axios.get(oneCallUrl);
      const data = response.data;

      finalResult.current = {
        temp: data.current.temp,
        feelsLike: data.current.feels_like,
        tempMin: data.daily[0].temp.min, // Use today's min/max
        tempMax: data.daily[0].temp.max,
        condition: data.current.weather[0].main,
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
        windSpeed: data.current.wind_speed,
        humidity: data.current.humidity,
        aqi: null, // One Call doesn't return AQI in the main object
        season: determineSeason(currentMonth),
      };

      finalResult.forecast = processOneCall(data.daily);

      // Fetch AQI separately since One Call exclude it usually/or structure is complex
      try {
        const pollutionUrl = `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const polRes = await axios.get(pollutionUrl);
        if (polRes.data.list && polRes.data.list.length > 0) {
           finalResult.current.aqi = polRes.data.list[0].main.aqi;
        }
      } catch (e) {
         console.log("AQI fetch failed for One Call path");
      }
      
      // If city name wasn't resolved via Geo (e.g. lat/lon input), try to keep existing name or use timezone
      // Since we resolved Geo first if City input, we are good. If Lat/Lon input, we might miss City Name without reverse geo.
      // Standard Weather API returns city name. One Call does NOT.
      // Let's do a quick Reverse Geo if lat/lon provided to get name
      if (!cityName) {
          try {
             const revGeo = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
             const revRes = await axios.get(revGeo);
             if (revRes.data && revRes.data.length > 0) {
                 finalResult.location.city = revRes.data[0].name;
                 finalResult.location.country = revRes.data[0].country;
             }
          } catch(e) { console.log('Reverse geo failed'); }
      }

      return finalResult;

    } catch (oneCallError) {
      console.warn("One Call API failed (likely proper subscription needed). Falling back to Standard API.", oneCallError.response?.status);
      
      // --- FALLBACK: STANDARD 5-DAY API ---
      
      // 1. Fetch Current Weather (Standard)
      const weatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      const response = await axios.get(weatherUrl);
      const data = response.data;
      
      // Update location info from standard response (it's reliable for name)
      finalResult.location = {
         city: data.name,
         country: data.sys.country,
         lat: data.coord.lat,
         lon: data.coord.lon
      };

      // Determine current hour for forecast syncing
      const timezoneOffsetSeconds = data.timezone; 
      const nowUtc = new Date().getTime() + (new Date().getTimezoneOffset() * 60000); // Current UTC
      const locationTime = new Date(nowUtc + (1000 * timezoneOffsetSeconds));
      const currentHour = locationTime.getHours();

      // 2. Fetch Forecast Air Pollution
      const pollutionForecastUrl = `${BASE_URL}/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      let pollutionList = [];
      try {
          const polRes = await axios.get(pollutionForecastUrl);
          pollutionList = polRes.data.list || [];
      } catch (err) {
          console.error('Failed to fetch pollution forecast:', err.message);
      }
      
      // 3. Fetch Forecast Weather (Standard 5 Day)
      const forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      const forecastResponse = await axios.get(forecastUrl);
      
      // Pass pollutionList to merge
      const forecastList = processForecast(forecastResponse.data.list, currentHour, pollutionList);

      // 4. Fetch Current AQI
      const pollutionUrl = `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      let aqi = null;
      try {
        const pollutionResponse = await axios.get(pollutionUrl);
        if (pollutionResponse.data.list && pollutionResponse.data.list.length > 0) {
          aqi = pollutionResponse.data.list[0].main.aqi; 
        }
      } catch (err) {}

      finalResult.current = {
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        aqi: aqi,
        season: determineSeason(currentMonth),
      };
      finalResult.forecast = forecastList;
      
      return finalResult;
    }

  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('City not found');
    }
    console.error('Error fetching weather data:', error.message);
    throw new Error('Failed to retrieve weather data.');
  }
};

module.exports = { getWeatherData };