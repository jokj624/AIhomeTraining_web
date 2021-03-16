
import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
    text: String,
    user: String,
    publishedDate: {
        type: Date,
        default: Date.now,
    },
});
const PostSchema = new Schema ( {
    title : String,
    body : String,
    publishedDate: {
        type: Date,
        default : Date.now,
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
    comments: [CommentSchema]
});

PostSchema.index({ title: 'text', body: 'text' });
const Post = mongoose.model('Post', PostSchema);
export default Post;