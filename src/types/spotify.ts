export type SpotifyImage = {
  height: number;
  url: string;
  width: number;
};

export type SpotifyExternalUrls = {
  spotify: string;
};

export type SpotifyArtistSummary = {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
};

export type SpotifyArtist = SpotifyArtistSummary & {
  followers: {
    href: null;
    total: number;
  };
  genres: string[];
  images: SpotifyImage[];
  popularity: number;
};

export type SpotifyAlbum = {
  album_type: string;
  artists: SpotifyArtistSummary[];
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  is_playable?: boolean;
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  total_tracks: number;
  type: 'album';
  uri: string;
};

export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtistSummary[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable?: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
};

export type SpotifyPaginatedResponse<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
};

export type SpotifyNowPlaying = {
  is_playing: boolean;
  timestamp: number;
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: string;
    uri: string;
  };
  progress_ms: 157488;
  item: {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url?: string;
    track_number: number;
    type: string;
    uri: string;
  };
  currently_playing_type: string;
  actions: {
    disallows: {
      pausing: boolean;
    };
  };
}