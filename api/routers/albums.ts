import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";
import {AlbumInterfaceWithoutId} from "../types";
const albumsRouter = express.Router();


albumsRouter.get('/', async (req, res, next) => {
    try {
        const idQuery = req.query.artist as string;
        if(idQuery){
            const albums = await Album.find({artist: idQuery});
            if(albums.length === 0){
                res.status(404).send({error:"Not found"});
            }
            else{
                res.send(albums);
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


albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
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
//
export default albumsRouter;
