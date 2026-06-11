const isMissingTokens = () => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return true;
  }

  return false;
};

const getTokenAuth = async () => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: `${SPOTIFY_REFRESH_TOKEN}`,
    }),
    headers: {
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });

  return await response.json();
};

const getAccessToken = async () => {
  const response = await getTokenAuth() as any;
  return response.access_token as string;
};

export const auth = {
  getAccessToken,
  isMissingTokens,
};