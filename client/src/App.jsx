import { useEffect, useState } from 'react';
import { fetchWeather } from './api/weatherApi';
import WeatherDisplay from './components/WeatherDisplay';
import OutfitCard from './components/OutfitCard';
import LocationPrompt from './components/LocationPrompt';
import ForecastCarousel from './components/ForecastCarousel';
import OccasionSelector from './components/OccasionSelector';
import Hero from './components/Hero';
import PublicSubmission from './pages/PublicSubmission';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Blog from './pages/Blog';
import SettingsModal from './components/SettingsModal';
// No App.css import needed, using Tailwind

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [locationMode, setLocationMode] = useState('prompt');
  const [view, setView] = useState('home');
  const [adminUser, setAdminUser] = useState(null);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [unit, setUnit] = useState('C'); // 'C' or 'F'
  const [gender, setGender] = useState('female'); // 'male' or 'female'

  // Pending settings state
  const [pendingUnit, setPendingUnit] = useState('C');
  const [pendingGender, setPendingGender] = useState('female');

  const [showSettings, setShowSettings] = useState(false);
  const [selectedReportDay, setSelectedReportDay] = useState(null); // Detailed report modal state

  const openSettings = () => {
    setPendingUnit(unit);
    setPendingGender(gender);
    setShowSettings(true);
  };

  const saveSettings = () => {
    setUnit(pendingUnit);
    setGender(pendingGender);
    setShowSettings(false);
  };

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    }
  }, []);


  const handleUseCurrentLocation = () => {
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadWeather({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      () => {
        setError("Location access denied. Please search for a city instead.");
        setLoading(false);
      }
    );
  };

  const handleSearchCity = (city) => {
    setLoading(true);
    setError(null);
    loadWeather({ city });
  };

  const loadWeather = (params) => {
    fetchWeather(params.lat, params.lon, params.city)
      .then((result) => {
        setData(result);
        setLocationMode('dashboard');
        setLoading(false);
      })
      .catch((err) => {
        setError(typeof err === 'string' ? err : "Failed to load weather.");
        setLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    setView('home');
  };

  // Dynamic Background classes based on weather
  const getBackgroundClass = () => {
    if (!data || !data.weather) return 'bg-gradient-to-br from-slate-900 to-slate-800';

    switch (data.weather.condition) {
      case 'Clear': return 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600'; // Deep Blue Sky
      case 'Clouds': return 'bg-gradient-to-br from-slate-600 via-slate-700 to-indigo-800'; // Moody Grey-Blue
      case 'Rain':
      case 'Drizzle': return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900'; // Deep Stormy Purple
      case 'Snow': return 'bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 text-slate-800'; // Soft Icy
      case 'Thunderstorm': return 'bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950'; // Darkest Night
      default: return 'bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-800'; // Signature Premium Gradient
    }
  };

  const bgClass = getBackgroundClass();
  const isLightText = !bgClass.includes('text-slate-800'); // Check if we need dark text for snow

  const renderContent = () => {
    // LOADING
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-4"></div>
          <p className="text-xl font-light animate-pulse">Consulting the clouds...</p>
        </div>
      );
    }

    // ERROR
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center px-4">
          <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 p-6 rounded-2xl">
            <p className="text-lg mb-4">⚠️ {error}</p>
            <button onClick={() => { setError(null); setLocationMode('prompt'); }} className="bg-white text-red-600 px-6 py-2 rounded-full font-bold hover:scale-105 transition">Try Again</button>
          </div>
        </div>
      );
    }

    // SUBMIT PAGE
    if (view === 'submit') {
      return (
        <div className="container mx-auto px-4 py-8">
          <button onClick={() => setView('home')} className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition">← Back</button>
          <PublicSubmission />
        </div>
      );
    }

    // ADMIN PAGE
    if (view === 'admin') {
      return (
        <div className="container mx-auto px-4 py-8">
          <button onClick={() => setView('home')} className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition">← Back</button>
          {adminUser ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={(user) => setAdminUser(user)} />}
        </div>
      );
    }

    if (locationMode === 'prompt') {
      return (
        <Hero>
          <LocationPrompt onUseCurrent={handleUseCurrentLocation} onSearchCity={handleSearchCity} />
        </Hero>
      );
    }

    // DASHBOARD
    return (
      <div className="container mx-auto px-4 pb-12 max-w-5xl fade-in-up">
        {/* Nav / Actions */}
        <div className="flex justify-end gap-3 py-4">
          <button onClick={() => setView('submit')} className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition font-medium text-sm">+ Add Outfit</button>
        </div>

        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <WeatherDisplay
                weather={selectedReportDay || data.weather}
                location={data.location}
                onChangeLocation={() => { setData(null); setLocationMode('prompt'); setSelectedOccasion(null); setSelectedReportDay(null); }}
                isLightText={isLightText}
                unit={unit}
              />
              <div className="flex flex-col justify-between h-full gap-4">
                <ForecastCarousel
                  forecast={data.forecast}
                  unit={unit}
                  onDayClick={setSelectedReportDay}
                />

                {/* Settings Toggle moved here */}
                <div className="flex justify-end pr-2">
                  <button
                    onClick={openSettings}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition text-white shadow-lg"
                    title="Settings"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                      <g transform="translate(12, 12) scale(0.6) translate(-12, -12)">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.41.41.435 1.056.098 1.516l-.498.718a1.432 1.432 0 00.329 1.777c.422.348 1.02.368 1.465.045l.938-.67c.54-.386 1.25-.296 1.688.136l.774.774a1.125 1.125 0 01.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.894.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l-.527.738c-.32-.447-.269-1.16.12-1.45l.774.773a1.125 1.125 0 011.449-.098l.718.498c.451.312 1.05.29 1.488-.136.438-.426.46-1.033.14-1.45l-.67-.938c-.386-.54-.296-1.25.136-1.688l.774-.774a1.125 1.125 0 011.45-.12l.737.527c.35.25.806.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <OccasionSelector selected={selectedOccasion} onSelect={setSelectedOccasion} />

              <h2 className="text-2xl font-bold mb-2">My Outfit Picks</h2>
              <p className={`opacity-80 mb-6 ${isLightText ? 'text-white' : 'text-slate-800'}`}>
                Perfect for {Math.round(data.weather.temp)}°C and {data.weather.condition} weather.
              </p>

              {(() => {
                const filteredSuggestions = selectedOccasion
                  ? data.suggestions.filter(o => o.category && o.category.toLowerCase() === selectedOccasion.toLowerCase())
                  : data.suggestions;

                // Filter by gender if implemented in data, otherwise just show all or filter if 'gender' prop exists
                // Assuming data.suggestions might not ideally support gender yet, but preparing logic:
                // const genderFiltered = filteredSuggestions.filter(o => !o.gender || o.gender === gender);
                // For now, using all suggestions as per current mock data structure.

                return filteredSuggestions.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSuggestions.map((outfit, idx) => (
                      <OutfitCard key={outfit._id} outfit={outfit} delay={idx * 100} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10">
                    <p className="text-xl mb-4">
                      {selectedOccasion
                        ? `No ${selectedOccasion} outfits found for this weather!`
                        : "No specific outfits found for these conditions yet!"}
                    </p>
                    <button onClick={() => setView('submit')} className="px-6 py-2 bg-white text-indigo-600 rounded-full font-bold hover:scale-105 transition">Be the first to add one</button>
                  </div>
                );
              })()}
            </div>
          </>
        )}
      </div>
    );
  };

  // Header / Navigation Logic
  const handleNavClick = (navItem) => {
    if (navItem === 'home') {
      if (view === 'home' && locationMode === 'prompt') {
        // Already at start, do nothing or simple refresh
      } else {
        // Reset to Home/Start
        setLocationMode('prompt');
        setData(null);
        setSelectedOccasion(null);
        setView('home');
      }
    } else if (navItem === 'admin') {
      setView('admin');
    } else {
      setView(navItem);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'FAQ' },
    { id: 'about', label: 'About' },
    { id: 'admin', label: 'Admin Portal' },
  ];

  // Alert Logic
  const [weatherAlert, setWeatherAlert] = useState(null);

  useEffect(() => {
    // Check for alerts (Rain / Air Quality) whenever weather data (current or selected) changes
    // If we have selected a future day, use that. Otherwise use current weather.
    const activeWeather = selectedReportDay || data?.weather;

    if (activeWeather) {
      const isRainy = ['Rain', 'Drizzle', 'Thunderstorm'].includes(activeWeather.condition);
      const isPoorAir = activeWeather.aqi && activeWeather.aqi >= 4;

      let newAlert = null;

      if (isRainy) {
        newAlert = {
          title: "Rain Alert!",
          message: "It's raining outside. Don't forget your umbrella ☔",
          color: "bg-blue-600/90",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
            </svg>
          )
        };
      } else if (isPoorAir) {
        newAlert = {
          title: "Poor Air Quality!",
          message: "Pollution is high. Please wear a mask 😷",
          color: "bg-red-600/90",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          )
        };
      }

      if (newAlert) {
        setWeatherAlert(newAlert);
        const timer = setTimeout(() => setWeatherAlert(null), 5000); // Auto dismiss after 5s
        return () => clearTimeout(timer);
      } else {
        setWeatherAlert(null); // Clear if no conditions met
      }
    }
  }, [data, selectedReportDay]);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${bgClass.includes('text-slate-800') ? 'text-slate-800' : 'text-white'} ${bgClass}`}>

      {/* Dynamic Pop-up Alert */}
      {weatherAlert && (
        <div className={`fixed top-24 right-4 z-[100] ${weatherAlert.color} backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce flex items-center gap-4 max-w-sm border border-white/20`}>
          <div className="bg-white/20 p-2 rounded-full">
            {weatherAlert.icon}
          </div>
          <div>
            <h4 className="font-bold text-lg uppercase tracking-wider mb-1">{weatherAlert.title}</h4>
            <p className="text-sm font-medium opacity-90">{weatherAlert.message}</p>
          </div>
        </div>
      )}

      {/* Premium Glassmorphism Header */}
      <header className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-xl border-b border-white/10 transition-all duration-500">
        <div className="container mx-auto max-w-7xl flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <div
            className="text-2xl font-black tracking-[0.2em] uppercase cursor-pointer text-white drop-shadow-md hover:scale-105 transition-transform"
            onClick={() => handleNavClick('home')}
          >
            WearToWeather
          </div>

          {/* Centered Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.filter(item => item.id !== 'admin').map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  relative text-sm font-bold tracking-widest uppercase transition-all duration-300
                  ${view === item.id
                    ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                    : 'text-white/60 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]'}
                `}
              >
                {item.label}
                {/* Glowing Active Dot */}
                {view === item.id && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Actions: Admin + Mobile Menu */}
          <div className="flex items-center gap-6">
            {/* Minimal Admin Link */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`hidden lg:block text-xs font-semibold tracking-wider transition-colors ${view === 'admin' ? 'text-white' : 'text-white/40 hover:text-white'}`}
            >
              ADMIN
            </button>

            {/* Mobile Menu Icon */}
            <div className="lg:hidden text-white cursor-pointer hover:bg-white/10 p-2 rounded-full transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
          </div>

        </div>
      </header>

      {/* Spacer for fixed header (Only show if NOT in prompt/hero mode to avoid double spacing or gap) */}
      {locationMode !== 'prompt' && <div className="h-20"></div>}

      <main className="fade-in-up">
        {(() => {
          // Render logic using immediate invocation to handle new views cleanly

          // Placeholders for new pages
          if (view === 'blog') return (
            <div className="container mx-auto px-4 py-8">
              <button onClick={() => setView('home')} className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition">← Back</button>
              <Blog />
            </div>
          );
          if (view === 'about') return (
            <div className="container mx-auto px-4 py-8">
              <button onClick={() => setView('home')} className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition">← Back</button>
              <About />
            </div>
          );
          if (view === 'faq') return (
            <div className="container mx-auto px-4 py-8">
              <button onClick={() => setView('home')} className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition">← Back</button>
              <FAQ />
            </div>
          );

          // Default existing content (Home, Admin, Submit)
          return renderContent();
        })()}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        pendingUnit={pendingUnit}
        setPendingUnit={setPendingUnit}
        pendingGender={pendingGender}
        setPendingGender={setPendingGender}
        onSave={saveSettings}
      />
    </div>
  );
}

export default App;