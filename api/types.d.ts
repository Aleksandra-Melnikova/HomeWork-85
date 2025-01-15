

export interface ArtistInterface {
    _id: string;
    name: string;
    description: string;
    image: string | null;
}

export type ArtistInterfaceWithoutId = Omit<ArtistInterface, '_id'>

export interface  AlbumInterface {
    _id: string;
    artist: ArtistInterface;
    title: string;
    year: number;
    image: string | null;
}

export interface  AlbumInterfaceNew {
    _id: Types.ObjectId;
    artist: Types.ObjectId;
    title: string;
    year: number;
    image: string | null | undefined;
    trackNumber: number;
}


export type AlbumInterfaceWithoutId = Omit<AlbumInterface, '_id'>

export interface  TrackInterface {
    _id: string;
    album: AlbumInterface;
    name: string;
    time: string;
    trackNumber: number;
}

export type TrackInterfaceWithoutId = Omit<TrackInterface, '_id'>

export interface UserFields {
    username: string;
    password: string;
    token: string;
}
