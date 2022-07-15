import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { replyComment, deleteComment } from '../redux/features/tour/tourSlice';


function Comments({ content, reply, _id }) {
  const { tours } = useSelector(state => state.tour)
  const dispatch = useDispatch()
  const initialState = {
    replies:""
  }
  const [replyData, setReplyData] = useState(initialState)
  const { replies } = replyData;
  const submitReplys = (commentId) => {
    dispatch(replyComment({ commentId, replyData }))
  }
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setReplyData({ ...replyData, [name]: value })
  }
  const deleteComments = (commentId) => {
    dispatch(deleteComment(commentId))
  }
  return (
    <>
      <div className='shadow-sm w-75 bg-light my-4'>
        <p>{content}</p>
        <form action="">
          <button onClick={() => deleteComments(_id)} className='btn btn-danger btn-sm'>delete comment</button> <br /> <br />
        </form>
      </div>
    {console.log(reply)}
    {/* <p className='lead fw-bold text-start'>Replies</p>
      <small className="text-start mb-2">{reply}</small>
      <form action="">
        <div className="d-flex">
          <input type="text" name="replies" value={replies} className='form-control' onChange={onInputChange}/>
          <button onClick={() => submitReplys(_id)} className='btn btn-primary btn-sm'>submit</button>
        </div>
      </form> */}
    </>
  )
}

export default Comments