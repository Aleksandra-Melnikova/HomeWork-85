import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistInterfaceWithoutId} from "../types";
import permit from "../middlewear/permit";
import auth from "../middlewear/auth";


const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
    try {
const artists = await Artist.find();
res.send(artists);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/',imagesUpload.single('image'),permit('admin','user'), async (req, res, next) => {
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



artistsRouter.delete('/:id', auth, permit("admin") ,async (req, res, next) => {
    // let expressReq = req as RequestWithUser
    // const user = expressReq.user;
    const artist = await Artist.findById(req.params.id);
    // if(!user){
    //     res.status(404).send({error: 'No authorized'});
    //     return;
    // }

    if (!artist) {
        res.status(404).send({error: 'Artist not found'});
    }

        // else if(product.user.toString() !== user._id.toString()) {
        //     res.status(403).send({error:"You are trying to delete someone else's product"});
    // }
    else{
        try{
            await Artist.deleteOne({_id: req.params.id});
            res.send({message: "Artist deleted successfully."});
        } catch(error){
            next(error);
        }}
});

export default artistsRouter;
