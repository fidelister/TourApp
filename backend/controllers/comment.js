import TourModel from "../model/tour.js";
import CommentModel from "../model/Comment.js";
import asyncHandler from "express-async-handler";
import mongoose from 'mongoose'

export const commentTours = asyncHandler(async (req, res) => {
    const { content, reply } = req.body
    const { id } = req.params
    let tour = await TourModel.findById(id)
    if (!tour) {
        return res.status(400).json({ message: 'Tour not found' })
    }
    let newComment = new CommentModel({
        content: content,
        reply: reply,
        tourId: id,
        user: req.user_id,
        name: req.user.name
    })
    await TourModel.findByIdAndUpdate(
        { _id: id },
        { $push: { comments: newComment._id } },
        { new: true }
    )
    await newComment.save();
    res.json({ message: "commented", comment: newComment })
})

export const replyComment = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { reply } = req.body
    let comment = await CommentModel.findById(id)
    if (!comment) {
        return res.status(400).json({ message: 'comment not found' })
    }
    const updatedComment = await CommentModel.findByIdAndUpdate(id, { $push: { reply: reply } }, { new: true })
    res.status(200).json({updatedComment})
})
export const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No tour with id:${id}` });
      }
      await CommentModel.findByIdAndRemove(id)
      res.status(200).json({ message: 'Tour deleted successfully' })
})