import TourModel from "../model/tour.js";
import asyncHandler from "express-async-handler";
import mongoose from 'mongoose'

export const createTour = asyncHandler(async (req, res) => {
  const tourData = req.body;
  console.log(tourData)
  if (!tourData) {
    res.status(400);
    throw new Error("pls add a tour");
  }
  const tour = await TourModel.create({
    ...tourData,
    user: req.user,
  });
  res.status(200).json(tour);
});
// res.status(400);
// throw new Error("pls add a tour");
export const getSingleTour = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  console.log(id)
  const tour = await TourModel.findById({ _id: id })
    .populate({ path: "comments", populate: { path: "content likes reply" } })
  res.status(200).json(tour);
});

export const getTours = asyncHandler(async (req, res) => {
  // const tours = await TourModel.find();
  // res.status(200).json(tours);
  const { page } = req.query;
  const limit = 6;
  const startIndex = (Number(page) - 1) * limit;
  const total = await TourModel.countDocuments({})
  const tours = await TourModel.find()
    .limit(limit)
    .skip(startIndex)
  res.json({
    data: tours,
    currentPage: Number(page),
    totalTours: total,
    numberOfPages: Math.ceil(total / limit)
  })
});

export const getToursByUser = asyncHandler(async (req, res) => {
  const userTours = await TourModel.find({ user: req.user._id })
  console.log(req.user)
  res.status(200).json(userTours)
})
export const deleteTour = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No tour with id:${id}` });
  }
  await TourModel.findByIdAndRemove(id)
  res.json({ message: 'Tour deleted successfully' })
})

export const updateTour = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { title, description, creator, imageFile, tags } = req.body
  const updatedTour = {
    creator, title, description, tags, imageFile, _id: id
  }
  await TourModel.findByIdAndUpdate(id, updatedTour, { new: true })
  res.json({ updatedTour })
})


export const getToursBySearch = asyncHandler(async (req, res) => {
  const { searchQuery } = req.query
  const title = new RegExp(searchQuery, 'i')
  const tours = await TourModel.find({ title })
  res.json(tours)
})

export const getToursByTags = asyncHandler(async (req, res) => {
  const { tag } = req.params
  const tours = await TourModel.find({ tags: { $in: tag } })
  // const tours = await TourModel.find({ tag })
  res.json(tours)
})
export const getRelatedTours = asyncHandler(async (req, res) => {
  const tags = req.body;
  const tours = await TourModel.find({ tags: { $in: tags } })
  // const tours = await TourModel.find({ tags })
  res.json(tours)
})


export const likeTours = asyncHandler(async (req, res) => {
  const { id } = req.params
  let checktour = await TourModel.findById(id)
  if (!checktour) return res.status(400).json({ message: "Tour not found" })
  const tour = await TourModel.find({ likedBy: req.user.name, _id: id, likes: req.user._id });
  console.log(req.user.name)
  if (tour.length > 0) {
    return res.status(400).json({ message: "User already liked" })
  } else {
    const updatedTour = await TourModel.findByIdAndUpdate(id, { $push: { likes: req.user._id, likedBy: req.user.name } }, { new: true })
    res.status(200).json({ updatedTour })
  }
})

export const adminGetUsers = asyncHandler(async (req, res) => {
  const tours = await TourModel.find()
    .populate({ path: "comments", populate: { path: "content likes reply" } })
  res.status(200).json(tours)
})

export const AdminDeleteTour = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No tour with id:${id}` });
  }
  await TourModel.findByIdAndRemove(id)
  res.json({ message: 'Tour deleted successfully' })
})