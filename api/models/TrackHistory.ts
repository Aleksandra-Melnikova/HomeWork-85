import mongoose, {Schema} from "mongoose";

const TrackHistorySchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true,'User is required'],
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: "Track",
        required: true,
    },
    datetime: {
        type: String,
        default:()=>new Date().toISOString(),
    },
    artistName:{
        type: String,
        required: true,
    }
});

const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);

export default TrackHistory;