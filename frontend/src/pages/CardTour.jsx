import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { likeTours } from "../redux/features/tour/tourSlice"
const CardTour = ({ imageFile, description, title, tags, _id, creator, likes }) => {
  const { user } = useSelector(state => state.auth)
  const { message } = useSelector(state => state.tour)
  let userId;
  { user ? userId = user.result._id : userId = "" }
  // console.log(userId)
  const dispatch = useDispatch()
  const excerpt = (str) => {
    if (str && str.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
  };
  const Likes = () => {
    if (likes ? likes.length : "" > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip tag="a" title={`You and ${likes.length - 1} other people liked this tour`}>
              {likes.length} Likes
            </MDBTooltip>
          ) :
            (
              `${likes.length} Likes${likes.length > 1 ? "s" : ""}`
            )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{likes.length}{likes.length === 1 ? "Like" : "Likes"}
        </>
      )
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    )
  }
  const handleLike = () => {
    dispatch(likeTours({ _id }))
  }
  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{creator}</div>
        <span className="text-start tag-card">
          {tags && tags.map((item) => (
            <Link to={`/tours/tag/${item}`}>#{item}</Link>
          ))}
          <MDBBtn style={{ float: "right" }} tag="a" color="none" onClick={!userId ? null : handleLike}>
            {
              !userId ? (
                <MDBTooltip title="Please login to like tour" tag="a">
                  <Likes />
                </MDBTooltip>
              ) : (
                <Likes />
              )
            }
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/singleTour/${_id}`}>Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
