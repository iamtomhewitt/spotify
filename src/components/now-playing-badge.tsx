import BadgeText from './badge-text';
import RoundedSquare from './rounded-square';
import SpotifyLogo from './spotify-logo';
import { SpotifyNowPlaying } from '../types/spotify';

const NowPlayingBadge = ({ lightColour, darkColour, nowPlaying }: Props) => {
  if (!nowPlaying) {
    return (
      <RoundedSquare darkColour='#12b44a' lightColour='#1ED760'>

        <SpotifyLogo />

        <BadgeText>
          <div>Nothing playing</div>
          <div style={{
            fontSize: '2.6rem',
            opacity: '0.7',
          }}>
            My headphones are off for now
          </div>
        </BadgeText>
      </RoundedSquare>
    );
  }

  const { item } = nowPlaying;
  const image = item.album.images[0];

  return (
    <RoundedSquare
      darkColour={darkColour}
      lightColour={lightColour}
      width={image.width}
      height={image.height}
    >
      <div style={{
        backgroundImage: `url(${image.url})`,
        backgroundSize: 'contain',
        borderRadius: '50px',
        display: 'flex',
        flexDirection: 'column',
        height: `${image.height * 0.7}px`,
        margin: '0 25% 25% 0',
        width: `${image.width * 0.7}px`,
      }} />

      <SpotifyLogo width={image.width} height={image.height} />

      <BadgeText>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '1.75rem',
        }}>
          <span>Now playing:</span>
          <br />
          <span style={{
            fontSize: '3rem',
          }}>
            {item.name}
          </span>
        </div>
        <div style={{
          opacity: '0.7',
        }}>
          {item.artists[0].name}
        </div>
      </BadgeText>
    </RoundedSquare>
  );
};

type Props = {
  lightColour: string;
  darkColour: string;
  nowPlaying?: SpotifyNowPlaying;
}

export default NowPlayingBadge;