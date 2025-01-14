export interface Artist {
  _id: string;
  name: string;
  image: string;
}


export interface  Album {
  _id: string;
  artist: ArtistInterface;
  title: string;
  year: number;
  image: string | null;
}

export interface User {
  _id: string;
  username: string;
  token: string;
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
    }
  },
  message: string;
  name: string;
  _message: string;
}
