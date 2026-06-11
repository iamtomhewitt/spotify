import { auth } from './auth';

const request = async <T>(path: string): Promise<T> => {
  const accessToken = await auth.getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as T;
};

export const spotify = {
  request,
};