import React, { useState, useEffect } from 'react';

interface SpotifyTrack {
  name: string;
  artist: string;
  albumArt: string;
  isPlaying: boolean;
}

const IntegrationsWidget: React.FC = () => {
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulate Spotify OAuth flow
  const handleLinkAccount = () => {
    // In a real application, you would redirect to your backend's Spotify OAuth endpoint
    // Example: window.location.href = 'YOUR_BACKEND_SPOTIFY_AUTH_URL';
    setLoading(true);
    setTimeout(() => {
      setIsSpotifyConnected(true);
      setLoading(false);
      // Simulate fetching current playback after connection
      fetchCurrentPlayback();
    }, 1500); // Simulate network delay for OAuth
  };

  // Simulate fetching current playback data
  const fetchCurrentPlayback = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentlyPlaying({
        name: 'Mock Song Title',
        artist: 'Mock Artist Name',
        albumArt: 'https://via.placeholder.com/64?text=Album', // Placeholder image
        isPlaying: true,
      });
      setLoading(false);
    }, 1000); // Simulate network delay for fetching playback
  };

  // Simulate playback control
  const controlPlayback = (action: 'play' | 'pause' | 'next' | 'previous') => {
    if (!currentlyPlaying) return;

    setCurrentlyPlaying(prev => {
      if (!prev) return null;
      if (action === 'play') return { ...prev, isPlaying: true };
      if (action === 'pause') return { ...prev, isPlaying: false };
      // For next/previous, we'd typically fetch a new song
      // For this mock, we'll just toggle play/pause or log the action
      console.log(`Simulating ${action} action.`);
      return prev;
    });
  };

  useEffect(() => {
    // In a real app, check for existing Spotify connection/tokens on mount
    // For this mock, we'll start disconnected unless explicitly linked
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4 items-center">
      <div className="flex items-center gap-2 w-full mb-4">
        <img src="https://img.icons8.com/color/48/spotify--v1.png" alt="Spotify" className="w-10 h-10" />
        <div className="flex-1">
          <div className="font-bold text-lg text-gray-800">Spotify Integration</div>
          <div className="text-sm text-gray-500">Empower yourself with habit tracking while enjoying uninterrupted music</div>
        </div>
      </div>

      {!isSpotifyConnected ? (
        <div className="w-full flex flex-col items-center gap-3">
          <button
            onClick={handleLinkAccount}
            disabled={loading}
            className="bg-green-500 text-white rounded-full px-6 py-3 w-full font-bold text-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connecting...' : 'Connect Spotify'}
          </button>
          <button className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 w-full font-semibold text-sm hover:bg-gray-300 transition-colors duration-200 ease-in-out">
            More Integrations
            <span className="block text-xs opacity-80">23+ apps</span>
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <p className="text-center text-green-600 font-semibold">Spotify Connected! Enjoy your music.</p>
          {currentlyPlaying ? (
            <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4 shadow-inner">
              <img src={currentlyPlaying.albumArt} alt="Album Art" className="w-16 h-16 rounded-md shadow" />
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-base leading-tight">{currentlyPlaying.name}</p>
                <p className="text-sm text-gray-600">{currentlyPlaying.artist}</p>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => controlPlayback('previous')}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-skip-back"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg>
                </button>
                <button
                  onClick={() => controlPlayback(currentlyPlaying.isPlaying ? 'pause' : 'play')}
                  className="text-gray-800 hover:text-gray-900 transition-colors duration-150 text-2xl"
                >
                  {currentlyPlaying.isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  )}
                </button>
                <button
                  onClick={() => controlPlayback('next')}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-skip-forward"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No music currently playing.</p>
          )}
          <button
            onClick={() => setIsSpotifyConnected(false)} // Simulate disconnect
            className="mt-2 bg-red-500 text-white rounded-lg px-4 py-2 w-full font-semibold hover:bg-red-600 transition-colors duration-200 ease-in-out shadow-sm"
          >
            Disconnect Spotify
          </button>
        </div>
      )}
    </div>
  );
};

export default IntegrationsWidget; 