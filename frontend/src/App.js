import React, { Component } from 'react';
import "./App.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/home";
import Login from "../src/pages/login";
import Signup from "../src/pages/signup";
import Header from "./components/Header";
import AddEditTour from "./pages/AddEditTour";
import SingleTour from "./pages/SingleTour";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import NotFound from './pages/NotFound';
import TagTours from './pages/TagTours';
import Admin from './pages/Admin';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import AdminSingleTour from './pages/AdminSingleTour';
import AdminAddEditTour from './pages/AdminAddEditTour'
import { useDispatch, useSelector } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <Header />
        {/* <ToastContainer />   */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours/search" element={<Home />} />
          <Route path="/tours/tag/:tag" element={<TagTours />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminSingleTour/:id" element={<AdminSingleTour />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addTour" element={<PrivateRoute><AddEditTour /></PrivateRoute>} />
          <Route path="/editTour/:userId" element={<PrivateRoute><AddEditTour /></PrivateRoute>} />
          <Route path="/adminEditTour/:userId" element={<AdminAddEditTour />}/> 
          <Route path="/singleTour/:id" element={<PrivateRoute><SingleTour /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="*" element={<PrivateRoute><NotFound /></PrivateRoute>} />
        </Routes>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
