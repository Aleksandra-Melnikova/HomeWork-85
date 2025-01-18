import express from "express";
import User from "../models/User";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import Album from "../models/Album";
import Artist from "../models/Artist";
import auth, {RequestWithUser} from "../middlewear/auth";
import {Error} from "mongoose";

const trackHistoryRouter = express.Router();
trackHistoryRouter.post('/', async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).send({error: 'No token present'});
        return
    }
    const user = await User.findOne({token});
    if (!user) {
        res.status(401).send({error: 'Unauthorized!'});
        return
    }

    let artist;
    if (req.body.track) {
        const track = await Track.findById(req.body.track);
        if (!track) res.status(404).send({error:'Not Found track'});
        const album = await Album.findById({_id: track?.album});
        artist = await Artist.findById({_id: album?.artist});}

    const newTrackHistory = {
        user: user._id,
        track: req.body.track,
        artistName: artist?.name
    };

    try {
        const trackHistory = new TrackHistory(newTrackHistory);
        await trackHistory.save();
        res.send(trackHistory);
    }

    catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return
        }
        next(error);
    }

});

trackHistoryRouter.get('/', auth, async (req, res, next) => {
    try {
        let reqWithAuth = req as RequestWithUser
        const user= reqWithAuth.user;
        const trackHistory = await TrackHistory.find({user: user}).populate("track");
        res.send(trackHistory);
    } catch (e) {
        next(e);
    }
});
export default trackHistoryRouter;


