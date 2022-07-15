import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tourService from "./tourService";

const initialState = {
  tour: {},
  tours: [],
  adminTours:[],
  userTours: [],
  relatedTours: [],
  tagTours: [],
  isError: false,
  currentPage: 1,
  numberOfPages: null,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create tour
export const createTour = createAsyncThunk(
  "tour/createTour",
  async (tour, thunkAPI) => {
    try {
      //call register function from tourService
      //this will be the payload if everything is ok
      const token = thunkAPI.getState().auth.user.token;
      return await tourService.createTour(tour, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //this will be the payload if there is an error
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//get all tours
export const getTours = createAsyncThunk(
  "tour/getTours",
  async (page, thunkAPI) => {
    try {
      return await tourService.getTours(page);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //this will be the payload if there is an error
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//get single tour
export const getSingleTour = createAsyncThunk(
  "tour/getSingleTour",
  async (id, thunkAPI) => {
    try {
      return await tourService.getSingleTour(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //this will be the payload if there is an error
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//get user tour
export const getUserTours = createAsyncThunk(
  "tour/getUserTours",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await tourService.getUserTours(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //this will be the payload if there is an error
      return thunkAPI.rejectWithValue(message);
    }
  }
);


//delete tour
export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async (tourId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await tourService.deleteTour(tourId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//update tour
export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async (allTourProp, thunkAPI) => {
    try {
      // console.log(tourData)
      //  console.log(allTourProp)
      //  console.log(allTourProp.userId)
      const token = thunkAPI.getState().auth.user.token;
      return await tourService.updateTour(allTourProp.userId, allTourProp, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//search tour
export const searchTour = createAsyncThunk(
  "tour/searchTour",
  async (searchQuery, thunkAPI) => {
    try {
      return await tourService.getToursBySearch(searchQuery);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//search tour by tags 
export const tourTag = createAsyncThunk(
  "tour/TourTag",
  async (tag, thunkAPI) => {
    try {
      return await tourService.tourTag(tag);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get related tours
export const getRelatedTours = createAsyncThunk(
  "tour/relatedTours",
  async (tours, thunkAPI) => {
    try {
      return await tourService.relatedTours(tours);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//like tours
export const likeTours = createAsyncThunk(
  "tour/likeTours",
  async ({_id}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await tourService.likeTours(_id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//comment tours
export const commentTours = createAsyncThunk(
  "tour/commentTours",
  async (comments, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await tourService.commentTours(comments.id, token, comments.commentData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);  
//reply comment tours
export const replyComment = createAsyncThunk(
  "tour/replyComment",
  async (replies, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await tourService.replyComment(replies.commentId, token, replies.replyData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//delete comment tours
export const deleteComment = createAsyncThunk(
  "tour/deleteComment",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await tourService.deleteComment(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//get all tours from admin
export const getAllAdminTours = createAsyncThunk(
  "tour/getAllAdminTours",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await tourService.getAllAdminTours(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


//handling the three lifecycles that were generated
export const tourSlice = createSlice({
  name: "tour",
  initialState: initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tours = action.payload;
        state.message = 'tour added successfully'
      })
      .addCase(createTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.tours = null;
      })
      .addCase(getTours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tours = action.payload.data;
        console.log(state.tours)
        state.numberOfPages = action.payload.numberOfPages
        state.currentPage = action.payload.currentPage
      })
      .addCase(getTours.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tours = null;
      })
      .addCase(getSingleTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tour = action.payload;
      })
      .addCase(getSingleTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tour = null;
      })
      .addCase(getUserTours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userTours = action.payload;
      })
      .addCase(getUserTours.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tour = null;
      })
      .addCase(deleteTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // console.log("action", action)
        const { arg } = action.meta;
        if (arg) {
          state.tours = state.tours.filter((item) => item._id !== arg)
          state.userTours = state.userTours.filter((item) => item._id !== arg)
        }
      })
      .addCase(deleteTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tour = null;
      })
      .addCase(updateTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const { arg: { userId } } = action.meta;
        if (userId) {
          state.userTours = state.userTours.map((item) => item._id === userId ? action.payload : item)
          state.tours = state.tours.map((item) => item._id === userId ? action.payload : item)
        }
      })
      .addCase(updateTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userTours = null;
        state.tours = null;
      })
      .addCase(searchTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tours = action.payload;
      })
      .addCase(searchTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(tourTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tourTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tagTours = action.payload;
      })
      .addCase(tourTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRelatedTours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRelatedTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.relatedTours = action.payload;
      })
      .addCase(getRelatedTours.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeTours.pending, (state) => {
      })
      .addCase(likeTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // console.log("action", action)
        const { arg: { _id } } = action.meta;
        if (_id) {
          state.tours = state.tours.map((item) => item._id === _id ? action.payload : item)
        }
      })
      .addCase(likeTours.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(commentTours.pending, (state) => {
      })
      .addCase(commentTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("action", action)    
        const { arg: { id } } = action.meta;
        console.log(action.payload)
        state.tours = action.payload
        state.tour = action.payload
        // console.log(state.tours)
        // if (id) {
        //   state.tour = state.tour.map((item) => item.id === id ? action.payload : item)
        //   // state.tours = state.tours.map((item) => item.id === id ? action.payload : item)
        // }
      })
      .addCase(commentTours.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(replyComment.pending, (state) => {
      })
      .addCase(replyComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("action", action)    
        const { arg: { id } } = action.meta;
        // console.log(action.payload)
        state.tours = action.payload
        state.tour = action.payload
      })
      .addCase(replyComment.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // console.log("action", action)
        const { arg } = action.meta;
        if (arg) {
          state.tours = state.tours.filter((item) => item._id !== arg)
          // state.userTours = state.userTours.filter((item) => item._id !== arg)
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tour = null;
      })
      .addCase(getAllAdminTours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAdminTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tours = action.payload;
      })
      .addCase(getAllAdminTours.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tours = null;
      })
  },
});

export const { setCurrentPage } = tourSlice.actions
export default tourSlice.reducer;
