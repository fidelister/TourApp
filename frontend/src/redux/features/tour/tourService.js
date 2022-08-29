import axios from 'axios';
const API_URL = 'https://tour-application-backend.herokuapp.com//user/tour/';

//create new tour
const createTour = async (tourData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(tourData)
    const response = await axios.post(API_URL, tourData, config);
    return response.data;
}

const getTours = async (page) => {
    const response = await axios.get(`${API_URL}?page=${page}`);
    return response.data
}

const getSingleTour = async (tourId) => {
    const response = await axios.get(API_URL + 'single/' + tourId);
    return response.data
}
const getUserTours = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'userTours/', config)
    return response.data
}
const deleteTour = async (tourId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + 'delete/' + tourId, config)
    return response.data
}

const updateTour = async (tourId, tourData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + 'update/' + tourId, tourData.updatedTour, config)
    return response.data
}
const getToursBySearch = async (searchQuery) => {
    const response = await axios.get(`${API_URL}/search?searchQuery=${searchQuery}`)
    return response.data
}
const tourTag = async (tag) => {
    const response = await axios.get(API_URL + 'tags/' + tag)
    return response.data
}
const relatedTours = async (tours) => {
    const response = await axios.post(API_URL + 'relatedTours/', tours)
    return response.data
}
const likeTours = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.patch(API_URL + `like/${id}`, id, config)
    return response.data
}
const commentTours = async (id, token, commentData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(commentData)
    const response = await axios.post(API_URL + `comment/${id}`, commentData, config)
    return response.data
}
const replyComment = async (id, token, replyData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(replyData)
    console.log(id)
    const response = await axios.patch(API_URL + `replycomment/${id}`, replyData, config)
    return response.data
}
const deleteComment = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(id)
    const response = await axios.delete(API_URL + `deletecomment/${id}`, config)
    return response.data
}
const getAllAdminTours = async (token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + `admingettours/`, config)
    return response.data
}


const tourService = {
    createTour,
    getTours,
    getSingleTour,
    getUserTours,
    deleteTour,
    updateTour,
    getToursBySearch,
    tourTag,
    relatedTours,
    likeTours,
    commentTours,
    replyComment,
    deleteComment,
    getAllAdminTours,
}

export default tourService;