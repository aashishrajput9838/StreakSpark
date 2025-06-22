import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';

const LoginWithSpotify = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
      <h2>Login with Spotify to connect your music</h2>
      <SpotifyAuth
        clientID={import.meta.env.VITE_SPOTIFY_CLIENT_ID}
        redirectUri={import.meta.env.VITE_SPOTIFY_REDIRECT_URI}
        scopes={[
          Scopes.userReadPrivate,
          Scopes.userReadEmail,
          Scopes.userTopRead,
          Scopes.streaming,
          Scopes.userReadPlaybackState,
          Scopes.userModifyPlaybackState,
        ]}
        title="Login with Spotify"
      />
    </div>
  );
};

export default LoginWithSpotify; 