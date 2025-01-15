export interface Artist {
  _id: string;
  name: string;
  image: string;
}


export interface  Album
{albums: { _id: string;
    artist: ArtistInterface;
    title: string;
    year: number;
    image: string | null}[],
    artist:Artist
}

export interface  Track  {tracks:{_id: string;
    album: AlbumInterface;
    name: string;
    time: string;
    trackNumber: number;}[],
    album: { _id: string;
        artist: ArtistInterface;
        title: string;
        year: number;
        image: string | null},
    artist: Artist
}
//
// export interface RegisterResponse {
//   user: User;
//   message: string;
// }
//
// export interface ValidationError {
//   errors: {
//     [key: string]: {
//       name: string;
//       message: string;
//     }
//   },
//   message: string;
//   name: string;
//   _message: string;
// }
