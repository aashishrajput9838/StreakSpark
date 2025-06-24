import React, { useState, useEffect, useRef } from 'react'; // add dragging (scrubbing) or a more advanced UI
import { getFirestore, collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { useAuthContext } from '@/contexts/AuthContext';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaHeart, FaRegHeart, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

interface Song {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
  favoritedAt?: number; // timestamp
}

const YouTubeMusicPlayer: React.FC = () => {
  const { user } = useAuthContext();
  const [query, setQuery] = useState('');
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Song | null>(null);
  const [embedUrl, setEmbedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<Song[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);

  const playerRef = useRef<any>(null);
  const ytPlayerDivRef = useRef<HTMLDivElement>(null);

  // Load favorites from Firestore on mount
  useEffect(() => {
    if (!user) return;
    const fetchFavorites = async () => {
      const db = getFirestore();
      const favRef = collection(db, 'users', user.uid, 'favorites');
      const snapshot = await getDocs(favRef);
      const favs: Song[] = snapshot.docs.map(doc => doc.data() as Song);
      // Sort by favoritedAt descending
      favs.sort((a, b) => (b.favoritedAt || 0) - (a.favoritedAt || 0));
      setFavorites(favs);
    };
    fetchFavorites();
  }, [user]);

  // When playlist or nowPlaying changes, update currentIndex
  useEffect(() => {
    if (nowPlaying && playlist.length > 0) {
      const idx = playlist.findIndex(song => song.videoId === nowPlaying.videoId);
      setCurrentIndex(idx !== -1 ? idx : 0);
    }
  }, [nowPlaying, playlist]);

  // Load YouTube IFrame API and create player when nowPlaying changes
  useEffect(() => {
    if (!nowPlaying) return;
    function createPlayer() {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      playerRef.current = new window.YT.Player('yt-music-player', {
        videoId: nowPlaying.videoId,
        height: '0',
        width: '100%',
        playerVars: {
          autoplay: 1,
          controls: 1,
        },
        events: {
          onReady: (event: any) => {
            if (muted) event.target.mute();
            else event.target.unMute();
          },
        },
      });
    }
    // @ts-ignore
    if (!(window as any).YT) {
      // @ts-ignore
      (window as any).onYouTubeIframeAPIReady = createPlayer;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    } else {
      createPlayer();
    }
    // Cleanup on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowPlaying]);

  // Poll current time and duration from the player
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (playerRef.current) {
      interval = setInterval(() => {
        const player = playerRef.current;
        if (player && typeof player.getCurrentTime === 'function' && typeof player.getDuration === 'function') {
          setCurrentTime(player.getCurrentTime());
          setDuration(player.getDuration());
        }
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [nowPlaying, isPlaying]);

  // Update player volume when volume state changes
  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(volume);
    }
  }, [volume, nowPlaying]);

  const playSong = async () => {
    setError('');
    setEmbedUrl('');
    setNowPlaying(null);
    setPlaylist([]);
    setShowOverlay(true); // Show overlay when new song is played
    if (!query.trim()) return;
    setLoading(true);
    try {
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${API_KEY}`;
      const res = await fetch(searchUrl);
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        const songs: Song[] = data.items.map((item: any) => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
          thumbnail:
            item.snippet.thumbnails?.maxres?.url ||
            item.snippet.thumbnails?.high?.url ||
            item.snippet.thumbnails?.medium?.url ||
            item.snippet.thumbnails?.default?.url || '',
        }));
        setPlaylist(songs);
        setNowPlaying(songs[0]);
        setEmbedUrl(`https://www.youtube.com/embed/${songs[0].videoId}?autoplay=1&controls=1`);
      } else {
        setError('No results found. Try a different keyword.');
      }
    } catch (err) {
      setError('Failed to fetch video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayFromPlaylist = (song: Song) => {
    setNowPlaying(song);
    setEmbedUrl(`https://www.youtube.com/embed/${song.videoId}?autoplay=1&controls=1`);
    setShowOverlay(true); // Show overlay when switching songs
  };

  // Toggle favorite in Firestore
  const toggleFavorite = async (song: Song) => {
    if (!user) return;
    const db = getFirestore();
    const favRef = doc(db, 'users', user.uid, 'favorites', song.videoId);
    const exists = favorites.some(fav => fav.videoId === song.videoId);
    if (exists) {
      await deleteDoc(favRef);
      setFavorites(prev => prev.filter(fav => fav.videoId !== song.videoId));
    } else {
      const favoritedAt = Date.now();
      await setDoc(favRef, { ...song, favoritedAt });
      setFavorites(prev => [{ ...song, favoritedAt }, ...prev]);
    }
  };

  const isFavorite = (song: Song) => favorites.some(fav => fav.videoId === song.videoId);

  // Play/pause toggles iframe mount
  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    const nextIdx = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIdx);
    setNowPlaying(playlist[nextIdx]);
    if (playerRef.current) {
      playerRef.current.loadVideoById(playlist[nextIdx].videoId);
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (playlist.length === 0) return;
    const prevIdx = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIdx);
    setNowPlaying(playlist[prevIdx]);
    if (playerRef.current) {
      playerRef.current.loadVideoById(playlist[prevIdx].videoId);
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (playerRef.current) {
      if (muted) {
        playerRef.current.unMute();
        setMuted(false);
      } else {
        playerRef.current.mute();
        setMuted(true);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!playerRef.current || !duration) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const seekTo = percent * duration;
    playerRef.current.seekTo(seekTo, true);
    setCurrentTime(seekTo);
  };

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          playSong();
        }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
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
      </form>
      <div style={{ marginTop: 20 }}>
        {loading && <div style={{ color: '#fff' }}>Loading...</div>}
        {error && <div style={{ color: 'orange', marginTop: 8 }}>{error}</div>}
        {nowPlaying && !loading && !error && (
          <div style={{
            maxWidth: 340,
            margin: '32px auto',
            background: 'linear-gradient(180deg, #a83279 0%, #d38312 100%)',
            borderRadius: 20,
            boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
            padding: 24,
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Now playing</div>
            <img
              src={nowPlaying.thumbnail}
              alt={nowPlaying.title}
              style={{ width: 220, height: 160, borderRadius: 16, objectFit: 'cover', marginBottom: 18, boxShadow: '0 2px 16px #0006' }}
            />
            <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 4, textAlign: 'center' }}>{nowPlaying.title}</div>
            <div style={{ color: '#ffe', fontSize: 15, marginBottom: 18, textAlign: 'center' }}>{nowPlaying.channel}</div>
            <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.18)', borderRadius: 3, marginBottom: 8, position: 'relative', cursor: 'pointer' }} onClick={handleSeek} title="Seek">
              <div style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%`, height: '100%', background: '#fff', borderRadius: 3, transition: 'width 0.3s' }}></div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#ffe', marginBottom: 10 }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, marginBottom: 18 }}>
              <button onClick={handlePrev} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer' }} title="Previous"><FaStepBackward /></button>
              <button onClick={handlePlayPause} style={{ background: '#fff', border: 'none', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a83279', fontSize: 32, boxShadow: '0 2px 8px #0004', cursor: 'pointer' }} title={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={handleNext} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer' }} title="Next"><FaStepForward /></button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
              <button onClick={() => toggleFavorite(nowPlaying)} style={{ background: 'none', border: 'none', color: isFavorite(nowPlaying) ? '#ff4b7d' : '#fff', fontSize: 26, cursor: 'pointer' }} title={isFavorite(nowPlaying) ? 'Remove from favorites' : 'Add to favorites'}>
                {isFavorite(nowPlaying) ? <FaHeart /> : <FaRegHeart />}
              </button>
              <button onClick={handleToggleMute} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' }} title={muted ? 'Unmute' : 'Mute'}>
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={muted ? 0 : volume}
                onChange={e => {
                  setVolume(Number(e.target.value));
                  if (muted && Number(e.target.value) > 0) setMuted(false);
                }}
                style={{ width: 80, marginLeft: 8 }}
                title="Volume"
              />
            </div>
            {/* Always render the YouTube player div when nowPlaying is set */}
            {nowPlaying && (
              <div id="yt-music-player" ref={ytPlayerDivRef} style={{ width: '100%', height: 0, background: '#111', display: 'block' }} />
            )}
          </div>
        )}
        {playlist.length > 0 && !loading && !error && (
          <div style={{ marginTop: 20 }}>
            <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: 8 }}>Playlist</div>
            <div style={{ maxHeight: 250, overflowY: 'auto' }}>
              {playlist.map(song => (
                <div
                  key={song.videoId}
                  style={{
                    display: 'flex', alignItems: 'center', marginBottom: 8, background: '#222', borderRadius: 6, padding: 6, cursor: 'pointer',
                    border: nowPlaying?.videoId === song.videoId ? '2px solid #1db954' : '1px solid #444'
                  }}
                  onClick={() => handlePlayFromPlaylist(song)}
                >
                  <img src={song.thumbnail} alt={song.title} style={{ width: 48, height: 36, borderRadius: 4, marginRight: 10 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontWeight: 500, fontSize: 15 }}>{song.title}</div>
                    <div style={{ color: '#aaa', fontSize: 13 }}>{song.channel}</div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); toggleFavorite(song); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, marginLeft: 8 }}
                    title={isFavorite(song) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFavorite(song) ? '❤️' : '🤍'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {favorites.length > 0 && showFavorites && (
          <div style={{ marginTop: 30 }}>
            <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: 8 }}>Favorites</div>
            <div style={{ maxHeight: 250, overflowY: 'auto' }}>
              {favorites.map((song, idx) => (
                <div
                  key={song.videoId}
                  style={{
                    color: '#fff',
                    fontSize: 15,
                    marginBottom: 4,
                    cursor: 'pointer',
                    textDecoration: nowPlaying?.videoId === song.videoId ? 'underline' : 'none'
                  }}
                  onClick={() => {
                    setNowPlaying(song);
                    setEmbedUrl(`https://www.youtube.com/embed/${song.videoId}?autoplay=1&controls=1`);
                    setShowOverlay(true);
                  }}
                  title="Click to play"
                >
                  {idx + 1}. {song.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => setShowFavorites(f => !f)}
        style={{ padding: 8, marginTop: 16, background: '#1db954', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', width: '100%' }}
      >
        {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
      </button>
    </div>
  );
};

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default YouTubeMusicPlayer;