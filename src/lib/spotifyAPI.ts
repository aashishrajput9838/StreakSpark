// TODO: Move these credentials to a .env file for security.
// Create a file named .env in your project's root directory (`StreakSpark/.env`)
// and add the following lines:
// VITE_RAPIDAPI_KEY=f653c9af34mshaff1c231e879f42p17df7bjsnc144e4ae8097
// VITE_RAPIDAPI_HOST=spotifystefan-skliarovv1.p.rapidapi.com
// Make sure to add .env to your .gitignore file.

const apiKey = import.meta.env.VITE_RAPIDAPI_KEY || 'f653c9af34mshaff1c231e879f42p17df7bjsnc144e4ae8097';
const apiHost = import.meta.env.VITE_RAPIDAPI_HOST || 'spotifystefan-skliarovv1.p.rapidapi.com';

export const addTracksToPlaylist = async (playlistId: string, trackUris: string[]) => {
  if (!apiKey || !apiHost) {
    throw new Error('Missing RapidAPI credentials. Make sure VITE_RAPIDAPI_KEY and VITE_RAPIDAPI_HOST are set in your .env file.');
  }
    
  const url = `https://${apiHost}/addTracksToPlaylist`;
  const encodedParams = new URLSearchParams();
  encodedParams.set('uris', trackUris.join(','));
  encodedParams.set('playlist_id', playlistId);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost
    },
    body: encodedParams
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorBody = await response.text();
        console.error('API Error Response:', errorBody);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log('Successfully added tracks to playlist:', result);
    return result;
  } catch (error) {
    console.error('Failed to add tracks to playlist:', error);
    throw error;
  }
}; 