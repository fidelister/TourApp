import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBInput,
  MDBContainer,
  MDBValidation,
  MDBIcon,
  MDBBtn
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getSingleTour, getRelatedTours, commentTours, replyComment } from "../redux/features/tour/tourSlice";
import RelatedTour from "../components/RelatedTour";
import Comments from "../components/Comments";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, tours, relatedTours } = useSelector((state) => state.tour);
  const { id } = useParams();
  const initialState = {
    content: "",
  }
  const [commentData, setCommentData] = useState(initialState)
  const { content } = commentData
  const tags = tour.tags

  useEffect(() => {
    tags && dispatch(getRelatedTours(tags))
  }, [tags])

  useEffect(() => {
    if (id) {
      dispatch(getSingleTour(id));
    }
  }, [id]);
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCommentData({ ...commentData, [name]: value })
  }
  const handleClear = () => {
    setCommentData({ content: "" })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content) {
      alert('Please type a comment')
    }
    else {
      dispatch(commentTours({ id, commentData }))
      handleClear()
    }
  }

  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={tour.imageFile}
            alt={tour.title}
          />
          <MDBCardBody>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName">Created By: {tour.creator}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar"
                size="lg"
              />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
          <MDBValidation className="row g-3" noValidate onSubmit={handleSubmit}>
            <MDBInput
              placeholder="Enter comment"
              type="content"
              value={content || ""}
              name="content"
              onChange={onInputChange}
              className="form-control"
              required
              invalid
              textarea
              rows={4}
            />
            <MDBBtn style={{ width: "100%" }}>
              comment
            </MDBBtn>
          </MDBValidation>
          {console.log(tour)}
          {
            tour.comments && tour.comments.map((item, index) =>
               <Comments key={index} {...item}/>
            )
          }
          <RelatedTour relatedTours={relatedTours} tourId={id} />
        </MDBCard>
        {/* <DisqusThread  id={id} title={tour.title} path={`/tour/${id}`}/> */}
      </MDBContainer>
    </>
  );
};

export default SingleTour;
