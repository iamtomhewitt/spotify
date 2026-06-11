import { SpotifyNowPlaying } from '../types/spotify';

const NowPlayingBadge = ({ lightColour, darkColour, nowPlaying }: Props) => {
  if (!nowPlaying) {
    return <div>TODO not playing anything</div>;
  }

  const { item } = nowPlaying;
  const image = item.album.images[0];

  return (
    <div style={{
      background: `linear-gradient(225deg, ${lightColour}, ${darkColour})`,
      borderRadius: '50px',
      display: 'flex',
      height: `${image.height}px`,
      padding: '4%',
      width: `${image.width}px`,
    }}>
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

      <img
        src='https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png'
        style={{
          height: `${image.height * 0.15}px`,
          position: 'absolute',
          right: '4%',
          top: '4%',
          width: `${image.width * 0.15}px`,
        }}
      />

      <div style={{
        borderRadius: '0 0 50px 50px',
        bottom: '0',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '3rem',
        height: '23%',
        position: 'absolute',
        textAlign: 'left',
      }}>
        <div>{item.name}</div>
        <div style={{
          opacity: '0.7',
        }}>{item.artists[0].name}</div>
      </div>
    </div >
  );
};

type Props = {
  lightColour: string;
  darkColour: string;
  nowPlaying?: SpotifyNowPlaying;
}

export default NowPlayingBadge;