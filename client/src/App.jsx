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
import Feedback from './pages/Feedback';
import SettingsModal from './components/SettingsModal';
import DarkModeToggle from './components/DarkModeToggle';
import OutfitGallery from './pages/OutfitGallery';
import VirtualWardrobe from './pages/VirtualWardrobe';
import ColorMoodBanner from './components/ColorMoodBanner';
import BlogPost from './pages/BlogPost';
// No App.css import needed, using Tailwind

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [locationMode, setLocationMode] = useState('prompt');
  const [view, setView] = useState('home');
  const [adminUser, setAdminUser] = useState(null);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null); // New state for active blog post
  const [unit, setUnit] = useState('C'); // 'C' or 'F'
  const [gender, setGender] = useState('female'); // 'male' or 'female'

  // Pending settings state
  const [pendingUnit, setPendingUnit] = useState('C');
  const [pendingGender, setPendingGender] = useState('female');

  const [showSettings, setShowSettings] = useState(false);
  const [selectedReportDay, setSelectedReportDay] = useState(null); // Detailed report modal state
  const [colorRecommendations, setColorRecommendations] = useState(null); // Color psychology feature

  const openSettings = () => {
    setPendingUnit(unit);
    setPendingGender(gender);
    setShowSettings(true);
  };

  const saveSettings = () => {
    setUnit(pendingUnit);
    setGender(pendingGender);
    setShowSettings(false);

    // Reload weather with new settings if we have location data
    if (data && data.location) {
      setLoading(true);
      // Uses the NEW pendingGender effectively via the state update? 
      // State update is async, so better pass explicitly or use useEffect. 
      // Simplest: pass pendingGender directly here.
      fetchWeather(data.location.lat, data.location.lon, data.location.city, pendingGender)
        .then(result => {
          setData(result);
          setLoading(false);
        })
        .catch(err => setLoading(false));
    }
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
    fetchWeather(params.lat, params.lon, params.city, gender)
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
                    className="p-3 rounded-full bg-[var(--card-bg)] hover:bg-[var(--card-hover)] backdrop-blur-md border border-[var(--border-color)] transition text-[var(--text-primary)] shadow-lg"
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
                Perfect for the {data.weather.season} season!
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
    { id: 'gallery', label: 'Gallery' },
    { id: 'wardrobe', label: 'My Wardrobe' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'FAQ' },
    { id: 'feedback', label: 'Feedback' },
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
    <div className="min-h-screen transition-all duration-500" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

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
      <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-2xl border-b border-white/10 transition-all duration-500">
        <div className="container mx-auto max-w-7xl flex items-center justify-between px-6 lg:px-8 py-5">

          {/* Logo */}
          <div
            className="text-xl lg:text-2xl font-black tracking-[0.15em] uppercase cursor-pointer text-white drop-shadow-lg hover:scale-105 transition-transform flex items-center gap-3"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-sm">☀️</span>
            </div>
            <span className="hidden sm:inline">WearToWeather</span>
            <span className="sm:hidden">W2W</span>
          </div>

          {/* Desktop Navigation - Primary Items Only */}
          <nav className="hidden lg:flex items-center gap-2">
            {/* Primary Nav Items */}
            {[
              { id: 'home', label: 'Home', icon: '🏠' },
              { id: 'gallery', label: 'Gallery', icon: '🖼️' },
              { id: 'wardrobe', label: 'Wardrobe', icon: '💼' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  relative px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300
                  ${view === item.id
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}

            {/* More Dropdown */}
            <div className="relative group">
              <button className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                ['blog', 'faq', 'feedback', 'about'].includes(view)
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}>
                <span>More</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                {[
                  { id: 'blog', label: 'Blog', icon: '📝' },
                  { id: 'faq', label: 'FAQ', icon: '❓' },
                  { id: 'feedback', label: 'Feedback', icon: '💬' },
                  { id: 'about', label: 'About', icon: 'ℹ️' },
                ].map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-200
                      ${view === item.id ? 'bg-indigo-500 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}
                      ${index !== 0 ? 'border-t border-white/5' : ''}
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Admin Link - Desktop Only */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`
                hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
                ${view === 'admin'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {showSettings && (
          <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-white/10 animate-fade-in-up">
            <div className="container mx-auto px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavClick(item.id);
                    setShowSettings(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all
                    ${view === item.id
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header (Only show if NOT in prompt/hero mode to avoid double spacing or gap) */}
      {locationMode !== 'prompt' && <div className="h-20"></div>}

      <main className="fade-in-up">
        {(() => {
          // Render logic using immediate invocation to handle new views cleanly

          // New Pages
          if (view === 'gallery') return <OutfitGallery />;
          if (view === 'wardrobe') return <VirtualWardrobe onNavigate={(page) => setView(page)} />;

          // Placeholders for new pages
          if (view === 'blog') return (
            <div className="container mx-auto px-4 py-8">
              <button onClick={() => setView('home')} className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition">← Back</button>
              <Blog onPostClick={(id) => { setSelectedBlogPost(id); setView('blog-post'); }} />
            </div>
          );
          if (view === 'blog-post') return (
            <BlogPost id={selectedBlogPost} onBack={() => setView('blog')} />
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
          if (view === 'feedback') return (
            <div className="container mx-auto px-4 py-8">
              <button onClick={() => setView('home')} className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition">← Back</button>
              <Feedback />
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