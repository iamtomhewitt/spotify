import dotenv from 'dotenv';
import fs from 'fs';
import getColours from 'get-image-colors';
import path from 'path';
import { BadRequestError, withErrorHandling } from '@iamtomhewitt/error';
import { ImageResponseOptions } from '@vercel/og';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

import NowPlayingBadge from '../components/now-playing-badge';
import { SpotifyNowPlaying } from '../types/spotify';
import { auth } from '../lib/auth';
import { spotify } from '../lib/spotify';

dotenv.config();

const main = async () => {
  if (auth.isMissingTokens()) {
    throw new BadRequestError('Missing environment variables');
  }

  const nowPlaying = await spotify.request<SpotifyNowPlaying | undefined>('/me/player/currently-playing');

  const { ImageResponse } = await import('@vercel/og');

  const imageOptions: ImageResponseOptions = {
    height: nowPlaying ? nowPlaying.item.album.images[0].height : 100,
    width: nowPlaying ? nowPlaying.item.album.images[0].width : 100,
  };

  const { light, dark } = await (async () => {
    const defaultColours = {
      colour: '#fff',
      dark: '#000',
      light: '#fff',
    };

    if (!nowPlaying) {
      return defaultColours;
    }

    const filePath = path.join(__dirname, 'album-art.jpg');
    const stream = fs.createWriteStream(filePath);
    const { body } = await fetch(nowPlaying?.item.album.images[0].url);

    if (!body) {
      return defaultColours;
    }

    await finished(Readable.fromWeb(body).pipe(stream));

    const colours = await getColours(filePath, {
      count: 1,
    });

    return {
      colour: colours[0].hex(),
      dark: colours[0].darken().hex(),
      light: colours[0].brighten().hex(),
    };
  })();

  const res = new ImageResponse(<NowPlayingBadge lightColour={light} darkColour={dark} nowPlaying={nowPlaying} />, imageOptions);
  const arrayBuffer = await res.arrayBuffer();

  if (process.env.USER && process.env.USER === 'thewitt') {
    fs.writeFileSync('output.png', Buffer.from(arrayBuffer)); // For local testing
  }

  return {
    body: Buffer.from(arrayBuffer).toString('base64'),
    headers: {
      'Content-Type': 'image/png',
    },
    isBase64Encoded: true,
    statusCode: 200,
  };
};

export const handler = withErrorHandling(
  main,
  (err, code) => {
    console.log('TODO return image saying error', err, code);
  },
);

(async () => {
  main();
})();