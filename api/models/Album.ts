import mongoose, {Schema} from "mongoose";

const AlbumSchema = new mongoose.Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: [true, 'Artist is required'],
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    year: {
        type: Number,
        required: true,
    },
    image: String,
    isPublished: {
        type: Boolean,
        default: false,
    },
});

const Album = mongoose.model("Album", AlbumSchema);

export default Album;