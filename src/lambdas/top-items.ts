import dotenv from 'dotenv';
import { BadRequestError, withErrorHandling } from '@iamtomhewitt/error';
import { http } from '@iamtomhewitt/http';

import { SpotifyArtist, SpotifyPaginatedResponse, SpotifyTrack } from '../types/spotify';
import { auth } from '../lib/auth';
import { spotify } from '../lib/spotify';

dotenv.config();

const main = async () => {
  if (auth.isMissingTokens()) {
    throw new BadRequestError('Missing environment variables');
  }

  const topArtists = await spotify.request<SpotifyPaginatedResponse<SpotifyArtist>>('/me/top/artists');
  const topTracks = await spotify.request<SpotifyPaginatedResponse<SpotifyTrack>>('/me/top/tracks');

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