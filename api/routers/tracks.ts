import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import {TrackInterfaceWithoutId} from "../types";
import Track from "../models/Track";
const tracksRouter = express.Router();


tracksRouter.get('/', async (req, res, next) => {
    try {
        const idQueryAlbum = req.query.album as string;
        const idQueryArtist = req.query.artist as string;
        if(idQueryAlbum){
            const tracks = await Track.find({album: idQueryAlbum});
            if(tracks.length === 0){
                res.status(404).send({error:"Not found"});
            }
            else{
                res.send(tracks);
            }}
        else if(idQueryArtist){
            const albums = await Album.find({artist: idQueryArtist });
            if(albums.length === 0){
                res.status(404).send({error:"Not found"});
            }else{
                const tracks = [];
                for (let i = 0; i < albums.length; i++) {
                    const track = await Track.find({album: albums[i]._id});
                    if(track.length!==0){
                        for (let i = 0; i< track.length; i++ )
                            tracks.push(track[i]);
                        }

                    }
                res.send(tracks);
                }
            }
        else{
            const albums = await Track.find();
            res.send(albums);
        }} catch (e) {
        next(e);
    }
});

tracksRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    if (req.body.album) {
        const artist = await Album.findById(req.body.album);
        if (!artist) res.status(404).send({error:'Not Found album'});
    }

    const newTrack:  TrackInterfaceWithoutId  = {
        album: req.body.album,
        name: req.body.name,
        time: req.body.time,
    };

    try {
        const track = new Track(newTrack);
        await track.save();
        res.send(track);
    }

    catch (e) {
        next(e);
    }
});
export default tracksRouter;