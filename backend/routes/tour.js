import express from "express"
const router =  express.Router()
import {createTour, getTours, getSingleTour,getToursByTags, getToursBySearch, updateTour, deleteTour, getToursByUser, getRelatedTours, likeTours, adminGetUsers, AdminDeleteTour} from '../controllers/tour.js'
import { commentTours, deleteComment, replyComment } from "../controllers/comment.js"
import {authAdmin, authUser, protect} from '../middleware/authMiddleware.js'


router.route('/', ).get(getTours)
router.get("/single/:id", getSingleTour)
router.get("/search", getToursBySearch)
router.get("/tags/:tag", getToursByTags)
router.post("/relatedTours", getRelatedTours)


router.route('/').post(protect,createTour)
router.get("/userTours/", protect, getToursByUser)  
router.delete('/delete/:id', protect, deleteTour)
router.put('/update/:id', protect, updateTour)
router.patch('/like/:id', protect, likeTours)
router.post('/comment/:id', protect, commentTours)
router.delete('/deletecomment/:id', protect, deleteComment)
router.patch('/replycomment/:id', protect, replyComment)

router.get('/admingettours', protect, authUser, adminGetUsers)
router.delete('/admindeletetours', protect, authUser, AdminDeleteTour)
export default router;