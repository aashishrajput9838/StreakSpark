import React, { useState } from 'react';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const YouTubeMusicPlayer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const playSong = async () => {
    setError('');
    setEmbedUrl('');
    if (!query.trim()) return;
    setLoading(true);
    try {
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(query)}&key=${API_KEY}`;
      const res = await fetch(searchUrl);
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        setEmbedUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
      } else {
        setError('No results found. Try a different keyword.');
      }
    } catch (err) {
      setError('Failed to fetch video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a song..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{
          padding: 8,
          width: 220,
          marginRight: 8,
          color: '#fff',
          background: '#222',
          border: '1px solid #444',
          borderRadius: 6
        }}
      />
      <button onClick={playSong} style={{ padding: 8 }}>Play</button>
      <a
        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#1db954', marginLeft: 12 }}
      >
        Open on YouTube
      </a>
      <div style={{ marginTop: 20 }}>
        {loading && <div style={{ color: '#fff' }}>Loading...</div>}
        {error && <div style={{ color: 'orange', marginTop: 8 }}>{error}</div>}
        {embedUrl && !loading && !error && (
          <>
            <iframe
              width="100%"
              height="380"
              src={embedUrl}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="YouTube Music Player"
              style={{ background: '#111' }}
            />
            <div style={{ color: '#ffb347', marginTop: 8, fontSize: 14 }}>
              If the video doesn't play, try opening the playlist on YouTube.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default YouTubeMusicPlayer; 