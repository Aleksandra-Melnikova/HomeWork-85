import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import {TrackInterfaceWithoutId} from "../types";
import Track from "../models/Track";
import Artist from "../models/Artist";
import permit from "../middlewear/permit";
import auth from "../middlewear/auth";

const tracksRouter = express.Router();


tracksRouter.get('/', async (req, res, next) => {
    try {
        const idQueryAlbum = req.query.album as string;
        const idQueryArtist = req.query.artist as string;
        if(idQueryAlbum){
            const album = await Album.findById({_id:idQueryAlbum});
           const artist = await Artist.findById({_id:album?.artist})
            const tracks = await Track.find({album: idQueryAlbum}).sort({trackNumber: 1});
            if(tracks.length === 0){
                res.status(404).send({error:"Not found"});
            }
            else{
                res.send({
                    tracks: tracks,
                    album: album,
                    artist: artist
                });
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

tracksRouter.post('/', imagesUpload.single('image'), auth, permit('admin','user'), async (req, res, next) => {
    if (req.body.album) {
        const artist = await Album.findById(req.body.album);
        if (!artist) res.status(404).send({error:'Not Found album'});
    }

    const newTrack:  TrackInterfaceWithoutId  = {
        album: req.body.album,
        name: req.body.name,
        time: req.body.time,
        trackNumber: req.body.trackNumber,
        linkYouTube: req.body.linkYouTube,
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

tracksRouter.delete('/:id', auth, permit("admin") ,async (req, res, next) => {
    // let expressReq = req as RequestWithUser
    // const user = expressReq.user;
    const track = await Track.findById(req.params.id);
    // if(!user){
    //     res.status(404).send({error: 'No authorized'});
    //     return;
    // }

    if (!track) {
        res.status(404).send({error: 'Track not found'});
    }

        // else if(product.user.toString() !== user._id.toString()) {
        //     res.status(403).send({error:"You are trying to delete someone else's product"});
    // }
    else{
        try{
            await Track.deleteOne({_id: req.params.id});
            res.send({message: "Track deleted successfully."});
        } catch(error){
            next(error);
        }}
});

tracksRouter.patch('/:id/togglePublished', auth, permit("admin"), async (req, res, next) => {
    try {
        const track = await Track.findOne(
            {_id: req.params.id}
        );

        if (!track) {
            res.status(403).send({error: "Track not found"});
            return;
        }

        const updateTrack = await Track.findOneAndUpdate(
            {_id: req.params.id},
            {isPublished: !track.isPublished},
            {new: true}
        );
        res.send(updateTrack);
    } catch (e) {
        next(e);
    }
});
export default tracksRouter;