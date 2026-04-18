import { auth } from './auth';

const request = async (path: string) => {
  const accessToken = await auth.getAccessToken();
  const data = await fetch(`https://api.spotify.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(r => r.json());
  return data.items;
};

export const spotify = {
  request,
};