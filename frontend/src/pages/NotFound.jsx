import React from "react";

const NotFound = () => {
  return (
    <div className="d-flex container" style={{marginTop:"10rem"}}>
        <div>
            <h1>Sorry! This page does'nt exist. <br/> Thank you.</h1>
        </div>
      <img src={require('../Assets/404.png')} alt="Not Found" />
    </div>
  );
};

export default NotFound;
