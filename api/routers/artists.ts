import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistInterfaceWithoutId} from "../types";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
    try {
const artists = await Artist.find();
res.send(artists);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/',imagesUpload.single('image'), async (req, res, next) => {
    const artistsData: ArtistInterfaceWithoutId = {
        name: req.body.name,
        description: req.body.description,
        image: req.file ? 'images' + req.file.filename : null,
    };
    try {
        const artist = new Artist(artistsData);
        await artist.save();
        res.send(artist);
    } catch (e) {
        next(e);
    }
});

export default artistsRouter;
