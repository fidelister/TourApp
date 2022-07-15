import mongoose from 'mongoose';

const tourSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: String,
    id: String,
    description: String,
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        likedBy:String
    }], 
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment",
            // user:[String]
        }
    ]
    // comments: [{
    //     text: [String],
    //     type: Array,
    //     // reply:[String],
    //     postedBy: {
    //         type: Object,
    //         ref: "User"
    //     }
    // }]
},
    //     //cast error occur mostly when the type of data coming contradicts the typeof data specified in the model

    { tagsKey: '$tags' },
    // { typeKey: '$type' }
)


export default mongoose.model("Tour", tourSchema)