import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1)); // Remove the '#'
      const accessToken = params.get('access_token');
      const error = params.get('error');

      if (accessToken) {
        // Save the token to localStorage so we can use it later
        localStorage.setItem('spotifyAccessToken', accessToken);

        // Redirect to the dashboard
        navigate('/'); // Or navigate('/dashboard') depending on your routes
      } else if (error) {
        // Handle the error case
        console.error('Spotify authentication error:', error);
        // Redirect to a login or error page
        navigate('/login'); // Or an error page
      }
    } else {
        // No hash found, redirect to login
        navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h2>Loading...</h2>
    </div>
  );
};

export default SpotifyCallback; 