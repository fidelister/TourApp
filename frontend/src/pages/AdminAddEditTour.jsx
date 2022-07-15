import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from '../redux/features/tour/tourSlice'

const initialState = {
  title: "",
  description: "",
  tags: [],
}
function AdminAddEditTour() {
  const { isError, loading, userTours, tours} = useSelector((state) => state.tour)
  const { user } = useSelector((state) => state.auth)
  const [tourData, setTourData] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(null)
  const { title, description, tags } = tourData

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  // const singleTour = userTours.find((tour) => tour._id === userId)
  // setTourData({ ...singleTour })

  useEffect(() => {
    if (userId) {
  // console.log("userId:", userId)
      const singleTour = tours.find((tour) => tour._id === userId)
      setTourData({ ...singleTour })
    }
  }, [userId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description || !tags) {
      setErrorMsg('input fields cannot be empty')
    }
    if(title && description && tags){
      if(!userId){
        dispatch(createTour({...tourData, creator: user.result.name }))
        alert('Tour added succesfully')
        navigate('/')
      }
      else{
        const updatedTour = { ...tourData, creator: user.result.name }
      dispatch(updateTour({userId, updatedTour}))
      alert('Tour updated succesfully')
      navigate('/')
      }
      handleClear()
    }
  
  }
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value })
  }
  const handleAddTag = (tag) => {
    setTourData({ ...tourData, tags: [...tourData.tags, tag] })
  }
  const handleDeleteTag = (deleteTag) => {
    setTourData({ ...tourData, tags: tourData.tags.filter((tag) => tag !== deleteTag) })
  }
  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] })
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{userId ? "Admin Update Tour" : "Add Tour"}</h5>
        <MDBCardBody>
          {errorMsg && <div className="tagErrMsg">{errorMsg}</div>}
          <MDBValidation className="row g-3" noValidate onSubmit={handleSubmit}>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Title"
                type="text"
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Description"
                type="text"
                value={description || ""}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {/* {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>} */}
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setTourData({ ...tourData, imageFile: base64 })}
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {userId?"Update Tour":"Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}

export default AdminAddEditTour