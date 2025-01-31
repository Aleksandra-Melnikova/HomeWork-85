import Album from "../../models/Album";
import {AlbumInterfaceWithoutId} from "../../types";
import {imagesUpload} from "../../multer";
import Artist from "../../models/Artist";
import Track from "../../models/Track";
import express from "express";


const albumsAdminRouter = express.Router();


albumsAdminRouter.get('/', async (req, res, next) => {
    try {
            const albums = await Album.find().populate("artist");
            res.send(albums);
        } catch (e) {
        next(e);
    }
});
//
// albumsAdminRouter.get('/:id', async (req, res, next) => {
//     const id = req.params.id;
//
//     if (!req.params.id) {
//         res.status(404).send({error:"Not found"});
//     }
//
//     try {
//         const album = await Album.findById(id).populate('artist');
//
//         if (!album) {
//             res.status(404).send({error:"Album not found"});
//         }
//         res.send(album);
//
//     } catch (e) {
//         next(e);
//     }
// });


// albumsAdminRouter.post('/', imagesUpload.single('image'),  async (req, res, next) => {
//     if (req.body.artist) {
//         const artist = await Artist.findById(req.body.artist);
//         if (!artist) res.status(404).send({error:"Not found artist"});
//     }
//
//     const newAlbum:  AlbumInterfaceWithoutId  = {
//         artist: req.body.artist,
//         title: req.body.title,
//         year: req.body.year,
//         image: req.file ? 'images' + req.file.filename : null,
//     };
//
//     try {
//         const album = new Album(newAlbum);
//         await album.save();
//         res.send(album);
//     }
//
//     catch (e) {
//         next(e);
//     }
// });

albumsAdminRouter.delete('/:id', async (req, res, next) => {
    const album = await Album.findById(req.params.id);
    if (!album) {
        res.status(404).send({error: 'Album not found'});
    }
    else{
        try{
            await Album.deleteOne({_id: req.params.id});
            await Track.deleteMany({album: album._id});
            res.send({message: "Album deleted successfully."});
        } catch(error){
            next(error);
        }}
});

albumsAdminRouter.patch('/:id/togglePublished',  async (req, res, next) => {

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

export default  albumsAdminRouter;
