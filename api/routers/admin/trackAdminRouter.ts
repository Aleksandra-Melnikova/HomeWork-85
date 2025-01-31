import express from "express";
import Album from "../../models/Album";
import Artist from "../../models/Artist";
import Track from "../../models/Track";
import {imagesUpload} from "../../multer";
import {TrackInterfaceWithoutId} from "../../types";
import artist from "../../models/Artist";

const tracksAdminRouter = express.Router();


tracksAdminRouter .get('/', async (req, res, next) => {
    try {
            const albums = await Track.find().populate('album');
            res.send(albums);
        } catch (e) {
        next(e);
    }
});

tracksAdminRouter .post('/', imagesUpload.single('image'), async (req, res, next) => {
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

tracksAdminRouter .delete('/:id' ,async (req, res, next) => {
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

tracksAdminRouter .patch('/:id/togglePublished', async (req, res, next) => {
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
export default tracksAdminRouter ;