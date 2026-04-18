import { auth } from './auth';

const request = async (path: string) => {
  const accessToken = await auth.getAccessToken();
  return await fetch(`https://api.spotify.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(r => r.json());
};

export const spotify = {
  request,
};