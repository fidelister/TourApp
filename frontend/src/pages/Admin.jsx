import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { adminDeleteTour, deleteTour, getAllAdminTours } from '../redux/features/tour/tourSlice'
import { useNavigate, Link } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";


function Admin() {
    const { isError, loading, tours } = useSelector((state) => state.tour)
    const { user } = useSelector((state) => state.auth)
    const [comment, setComment] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllAdminTours());
    }, []);

   

    const handleSingle = (tourId) => {
        navigate(`/adminSingleTour/${tourId}`)
    }

    const excerpt = (str) => {
        if (str && str.length > 30) {
            str = str.substring(0, 45) + " ...";
        }
        return str;
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this tour?")) {
            dispatch(deleteTour(id))
            console.log(id)
        }
    }

    return (
        <>
        <div style={{ marginTop: "7rem" }}>
       <h2>Welcome {user && user.result.name} (Admin)</h2>
       {tours.length === 0 ? (
          <MDBTypography className="text-center mb-0" tag="h4">
            No one has registered yet
          </MDBTypography>
        ):(
            <table class="table table-striped table-responsive">
            <thead>
                <tr>
                    <th scope="col">S/N</th>
                    <th scope="col">Posted By</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Images</th>
                    <th scope="col">Tags</th>
                    <th scope="col">Comments</th>
                    {/* <th scope="col">Likes</th> */}
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    tours && tours.map((tour, index) => (
                        // <Link to={`/adminSingleTour/${tour._id}`}>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{tour.creator}</td>
                            <td>{tour.title}</td>
                            <td>{excerpt(tour.description)}</td>
                            <td><img src={tour.imageFile} alt="imageFile" height="80px" width="120px" /></td>
                            <td>{tour.tags}</td>
                            <td>
                                <p className='fw-bold'>
                                    {`Comment${tour.comments.length > 1 ? "s" : ""}`} ({tour.comments.length})
                                </p>
                                {
                                    tour.comments && tour.comments.map((tou, index) => (
                                        <>
                                            <p>{index + 1}. {tou.content}</p>
                                        </>
                                    )).splice(0, 2)
                                }
                                {tour.comments.length > 1 ? (
                                    <p>others...</p>
                                ) : ("")}
                            </td>
                            <td >
                                <Link to={`/adminEditTour/${tour._id}`}>
                                    <a href="#" className="btn btn-primary btn-sm">update</a>
                                </Link>
                                <br /> <br />
                                <a href="#" className="btn btn-danger btn-sm" onClick={() => handleDelete(tour._id)}>delete</a>
                            </td>
                        </tr>
                        // </Link>
                    ))
                }
            </tbody>
        </table >
        )}
            
       
        </div >
        </>
    )
}

export default Admin