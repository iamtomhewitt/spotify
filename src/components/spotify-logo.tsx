const SpotifyLogo = ({ width = 640, height = 640 }: Props) => (
  <img
    src='https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png'
    style={{
      height: `${height * 0.15}px`,
      position: 'absolute',
      right: '4%',
      top: '4%',
      width: `${width * 0.15}px`,
    }}
  />
);

type Props = {
  height?: number;
  width?: number;
}

export default SpotifyLogo;