import { BadRequestError, withErrorHandling } from '../lib/error';
import { response } from '../lib/response';
import { spotify } from '../lib/spotify';

const main = async () => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new BadRequestError('Missing environment variables');
  }

  const topArtists = await spotify.request('/me/top/artists');
  const topTracks = await spotify.request('/me/top/tracks');

  return response.ok({
    body: {
      topArtists,
      topTracks,
    },
  });
};

export const handler = withErrorHandling(main);