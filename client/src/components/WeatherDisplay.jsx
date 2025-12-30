import React from 'react';

const WeatherDisplay = ({ weather, location, onChangeLocation, isLightText, unit }) => {
  if (!weather) return null;

  const getTemp = (celsius) => {
    if (celsius === undefined || celsius === null) return '--';
    if (unit === 'F') return Math.round((celsius * 9 / 5) + 32);
    return Math.round(celsius);
  };

  const getSpeed = (metric) => {
    if (metric === undefined || metric === null) return 'N/A';
    if (unit === 'F') return (metric * 2.237).toFixed(1) + ' mph';
    return metric + ' m/s';
  };

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;
  // Use standard theme color rather than forced override, so it adapts to Light/Dark mode
  // Force white text for readability on black cards
  const textColor = 'text-white';
  const glassBg = 'bg-black/60 border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.4)]';

  return (
    <div className={`p-10 rounded-[2.5rem] backdrop-blur-2xl border ${glassBg} relative overflow-hidden group h-full flex flex-col justify-between transition-all hover:scale-[1.01] duration-500`}>
      {/* Dynamic Background Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 blur-[100px] rounded-full pointer-events-none animate-pulse-slow"></div>

      {/* Header: Location & Date */}
      <div className="flex justify-between items-start z-10">
        <div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-1">
              <h2 className={`text-4xl font-black tracking-tight ${textColor}`}>{location?.city}</h2>
              <button
                onClick={onChangeLocation}
                className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-current opacity-40 hover:opacity-100 transition-opacity ${textColor}`}
              >
                Change
              </button>
            </div>
            <p className={`text-lg font-medium opacity-70 ${textColor}`}>
              {weather.date
                ? new Date(weather.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                : 'Today'}
            </p>
          </div>
        </div>

        {/* Season / Badge */}
        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-xl bg-white/20 border border-white/10 shadow-sm ${textColor}`}>
          {weather.season || 'CURRENT'}
        </div>
      </div>

      {/* Main Stats: Temp & Icon */}
      <div className="flex items-center justify-between my-8 z-10 relative">
        <div className="flex flex-col">
          <h1 className={`text-[9rem] leading-none font-thin tracking-tighter ${textColor} drop-shadow-xl`}>
            {weather.temp !== undefined ? getTemp(weather.temp) + '°' : getTemp(weather.tempMax) + '°'}
          </h1>
          <p className={`text-2xl font-light tracking-wide capitalize opacity-90 pl-2 ${textColor}`}>{weather.description}</p>
        </div>

        {/* Animated Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-75 animate-pulse"></div>
          <img src={iconUrl} alt={weather.condition} className="w-48 h-48 object-contain drop-shadow-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-500" />
        </div>
      </div>

      {/* Footer Stats Grid */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-black/5 border border-white/5 backdrop-blur-sm ${textColor}`}>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-1">Feels Like</p>
          <p className="font-bold text-xl">{getTemp(weather.feelsLike)}°</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-1">Humidity</p>
          <p className="font-bold text-xl">{weather.humidity !== undefined ? weather.humidity : '--'}%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-1">Wind Speed</p>
          <p className="font-bold text-xl">{getSpeed(weather.windSpeed)}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-1">Air Quality</p>
          <p className="font-bold text-xl">
            {weather.aqi ? ['Good', 'Fair', 'Mod.', 'Poor', 'Bad'][weather.aqi - 1] : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;