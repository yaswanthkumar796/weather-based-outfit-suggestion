import { useEffect, useState } from 'react';
import { fetchSuggestions } from './api/weatherApi';
import WeatherDisplay from './components/WeatherDisplay';
import OutfitCard from './components/OutfitCard';
import AdminPage from './pages/AdminPage'; // Import the Admin Page
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false); // State to toggle Admin view

  useEffect(() => {
    // Only fetch weather if we are NOT on the admin page (optimization)
    if (!showAdmin) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchSuggestions(latitude, longitude)
            .then((result) => {
              setData(result);
              setLoading(false);
            })
            .catch((err) => {
              setError("Failed to connect to backend.");
              setLoading(false);
            });
        },
        (err) => {
          setError("Please allow location access to use this app.");
          setLoading(false);
        }
      );
    }
  }, [showAdmin]); // Re-run when switching back to home

  // Loading Screen Component
  if (loading && !showAdmin) return <div className="loading-screen">✨ Curating your style...</div>;
  
  // Error Screen Component
  if (error && !showAdmin) return <div className="loading-screen" style={{color: '#ff6b6b'}}>{error}</div>;

  return (
    <div className="app-container">
      {/* Navigation Button */}
      <button 
        onClick={() => setShowAdmin(!showAdmin)}
        style={{
          position: 'absolute', 
          top: 20, 
          right: 20, 
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          border: '1px solid white',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          backdropFilter: 'blur(5px)'
        }}
      >
        {showAdmin ? '← Back to Home' : '⚙️ Admin Panel'}
      </button>

      <h1 className="app-title">WeatherFit AI</h1>
      
      {showAdmin ? (
        // SHOW ADMIN PAGE
        <AdminPage />
      ) : (
        // SHOW MAIN WEATHER APP
        <>
           {data && <WeatherDisplay weather={data.weather} />}
           
           {data && (
             <div className="suggestions-section">
                <h2 className="section-title">Recommended for You</h2>
                
                {data.suggestions.length > 0 ? (
                  <div className="outfit-grid">
                    {data.suggestions.map((outfit) => (
                      <OutfitCard key={outfit._id} outfit={outfit} />
                    ))}
                  </div>
                ) : (
                  <div style={{color: 'white', textAlign: 'center', opacity: 0.8, fontSize: '1.2rem'}}>
                    <p>No specific suggestions for this exact temperature ({Math.round(data.weather.temp)}°C).</p>
                    <p>Use the <strong>Admin Panel</strong> to add outfits for this range!</p>
                  </div>
                )}
             </div>
           )}
        </>
      )}
    </div>
  );
}

export default App;