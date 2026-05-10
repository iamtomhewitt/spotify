import { BadRequestError, withErrorHandling } from '@iamtomhewitt/error';
import { http } from '@iamtomhewitt/http';

import { spotify } from '../lib/spotify';

const main = async () => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new BadRequestError('Missing environment variables');
  }

  const topArtists = await spotify.request('/me/top/artists');
  const topTracks = await spotify.request('/me/top/tracks');

  return http.response.ok({
    body: {
      artists: topArtists.items,
      tracks: topTracks.items,
    },
  });
};

export const handler = withErrorHandling(
  main,
  (err, code) => http.response.json(code, {
    message: `${err.name}: ${err.message}`,
  }),
);