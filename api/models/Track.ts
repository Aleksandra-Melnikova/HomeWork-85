import mongoose, { Schema } from "mongoose";

const TrackSchema = new mongoose.Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: [true, "Album is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  time: {
    type: String,
    required: true,
  },
  trackNumber: {
    type: Number,
    required: true,
  },
  linkYouTube: {
    type: String,
    default: null,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Track = mongoose.model("Track", TrackSchema);

export default Track;
