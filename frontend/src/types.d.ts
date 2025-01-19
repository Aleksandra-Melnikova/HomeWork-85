export interface Artist {
  _id: string;
  name: string;
  image: string;
}

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
}

export interface TrackHistoryPost {
  Id: string;
  token: string;
}
