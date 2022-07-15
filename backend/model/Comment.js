import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    content: { type: String, required: true },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    reply:[ {type:String}],
    tourId: mongoose.Schema.Types.ObjectId,
    user:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    name:{
        type:String,
    }
},
    { timeStamp: true }
)
export default mongoose.model("Comment", commentSchema)
