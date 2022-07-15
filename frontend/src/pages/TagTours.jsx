import React, { useEffect, useState } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBRow,
  MDBBtn,
  MDBCol
} from "mdb-react-ui-kit";
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner';
import { tourTag } from '../redux/features/tour/tourSlice';
import { Link } from 'react-router-dom'

function TagTours() {
  const { tagTours, loading } = useSelector((state) => state.tour)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tag } = useParams()
  useEffect(() => {
    if (tag) {
      dispatch(tourTag(tag))
    }
  }, [tag])

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };

  if (loading) {
    return <Spinner />
  }
  return (
    <>
      <div
        style={{
          margin: "auto",
          padding: "120px",
          maxWidth: "900px",
          alignContent: "center",
        }}
      >
        {tagTours && tagTours.map((item)=>(
        <h4 className="text-center">Tours with tags:{item.tags} </h4>
        )).splice(0,1)}
        <hr style={{ maxWidth: "570px" }} />
        {/* {console.log(tagTours[0].tags)} */}
        {tagTours &&
          tagTours.map((item) => (
            <MDBCardGroup key={item._id}>
              <MDBCard
                style={{ maxWidth: "600px" }}
                className="mt-2"
              >
                <MDBRow className="g-0">
                  <MDBCol md="4">
                    <MDBCardImage
                      className="rounded"
                      src={item.imageFile}
                      alt={item.title}
                      fluid
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">
                        {item.title}
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                        <small className="text-muted">
                          {excerpt(item.description)}
                          <Link to={`/singleTour/${item._id}`}>Read More</Link>

                        </small>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCardGroup>
          ))}
      </div>
    </>
  )
}

export default TagTours