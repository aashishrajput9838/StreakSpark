import React from 'react';

const SpotifyPlayer = () => {
  return (
    <div className="spotify-player" style={{ padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <iframe
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator"
        width="100%"
        height="380"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
        style={{ borderRadius: '12px' }}
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer; 