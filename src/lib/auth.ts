const getTokenAuth = async () => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: `${SPOTIFY_REFRESH_TOKEN}`,
    }),
  });

  return await response.json();
};

const getAccessToken = async () => {
  const response = await getTokenAuth();
  return response.access_token as string;
};

export const auth = {
  getAccessToken,
};