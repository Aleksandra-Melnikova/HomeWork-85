import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";
import { AlbumInterfaceWithoutId} from "../types";
import Track from "../models/Track";
import permit from "../middlewear/permit";
import auth from "../middlewear/auth";

const albumsRouter = express.Router();


albumsRouter.get('/', async (req, res, next) => {
    try {
        const albumNew = [];
        const idQuery = req.query.artist as string;
        if(idQuery){
            const albums = await Album.find({artist: idQuery}).populate("artist").sort({year: -1});
            const arrayNew:number[] = [];
            for(let i=0; i<albums.length; i++){
                const array = await Track.find({album: albums[i]._id});
                arrayNew.push(array.length);
            }

            for(let i=0; i<arrayNew.length; i++){
                for (let j=0; j<albums.length; j++){
                    if(i===j){
                        albumNew.push({
                            album: albums[i],
                            trackNumber: arrayNew[i],
                        });
                    }
                }
            }
            if(albums.length === 0){
                res.status(404).send({error:"Not found"});
            }
            else{
                res.send(
                    albumNew
                );
            }}
        else{
           const albums = await Album.find();
           res.send(albums);
    }} catch (e) {
        next(e);
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error:"Not found"});
    }

    try {
        const album = await Album.findById(id).populate('artist');

        if (!album) {
            res.status(404).send({error:"Album not found"});
        }
            res.send(album);

    } catch (e) {
        next(e);
    }
});


albumsRouter.post('/', imagesUpload.single('image'), auth, permit('admin','user'), async (req, res, next) => {
    if (req.body.artist) {
        const artist = await Artist.findById(req.body.artist);
        if (!artist) res.status(404).send({error:"Not found artist"});
    }

    const newAlbum:  AlbumInterfaceWithoutId  = {
        artist: req.body.artist,
        title: req.body.title,
        year: req.body.year,
        image: req.file ? 'images' + req.file.filename : null,
    };

    try {
        const album = new Album(newAlbum);
        await album.save();
        res.send(album);
    }

     catch (e) {
        next(e);
    }
});

albumsRouter.delete('/:id', auth, permit("admin") ,async (req, res, next) => {
        // let expressReq = req as RequestWithUser
        // const user = expressReq.user;
        const album = await Album.findById(req.params.id);
        // if(!user){
        //     res.status(404).send({error: 'No authorized'});
        //     return;
        // }

        if (!album) {
            res.status(404).send({error: 'Album not found'});
        }

        // else if(product.user.toString() !== user._id.toString()) {
        //     res.status(403).send({error:"You are trying to delete someone else's product"});
        // }
        else{
            try{
            await Album.deleteOne({_id: req.params.id});
            await Track.deleteMany({album: album._id});
            res.send({message: "Album deleted successfully."});
        } catch(error){
        next(error);
    }}
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {

    try {
        const album = await Album.findOne(
            {_id: req.params.id}
        );

        if (!album) {
            res.status(403).send({error: "Album not found"});
            return;
        }

        const updateAlbum = await Album.findOneAndUpdate(
            {_id: req.params.id},
            {isPublished: !album.isPublished},
            {new: true}
        );
        res.send(updateAlbum);
    } catch (e) {
        next(e);
    }
});

export default albumsRouter;
