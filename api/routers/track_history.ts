import express from "express";
import User from "../models/User";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";

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
    if (req.body.track) {
        const track = await Track.findById(req.body.track);
        if (!track) res.status(404).send({error:'Not Found track'});
    }
    const newTrackHistory = {
        user: user._id,
        track: req.body.track,
    };

    try {
        const trackHistory = new TrackHistory(newTrackHistory);
        await trackHistory.save();
        res.send(trackHistory);
    }

    catch (e) {
        next(e);
    }

});
export default trackHistoryRouter;


