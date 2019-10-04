import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileURL: {
        type: String,
        required: 'File URL is required'
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    views : {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, // id만 반환
        ref: "Comment"
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const model = mongoose.model("Video", VideoSchema);

export default model;