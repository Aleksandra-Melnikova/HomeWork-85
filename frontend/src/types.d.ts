export interface Artist {
  _id: string;
  name: string;
  image: string | null;
  isPublished: boolean;
}

export interface ArtistMutation {
  name: string;
  description: string;
  image: string | null;
  isPublished: boolean;
}

export interface Album {
  _id: string;
  artist: ArtistInterface;
  title: string;
  year: number;
  image: string | null;
  isPublished: boolean;
}

export type AlbumMutation = Omit<Album, "_id">;

export interface TrackHistory {
  _id: string;
  user: User;
  track: {
    _id: string;
    album: AlbumInterface;
    name: string;
    time: string;
    trackNumber: number;
  };
  datetime: string;
  artistName: string;
}

export interface AlbumNew {
  album: {
    _id: string;
    artist: ArtistInterface;
    title: string;
    year: number;
    image: string | null;
    isPublished: boolean;
  };
  trackNumber: number;
}

export interface Track {
  tracks: {
    _id: string;
    album: AlbumInterface;
    name: string;
    time: string;
    trackNumber: number;
    linkYouTube: string;
    isPublished: boolean;
  }[];
  album: {
    _id: string;
    artist: ArtistInterface;
    title: string;
    year: number;
    image: string | null;
  };
  artist: Artist;
}
export interface TrackAdmin {
  _id: string;
  album: AlbumInterface;
  name: string;
  time: string;
  trackNumber: number;
  linkYouTube: string;
  isPublished: boolean;
}

export interface TrackInterfaceWithoutID {
  album: string;
  name: string;
  time: string;
  trackNumber: number;
  isPublished: boolean;
  linkYouTube: null | string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface TrackHistoryPost {
  Id: string;
  token: string;
}
