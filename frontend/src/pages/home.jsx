import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage } from "../redux/features/tour/tourSlice";
import CardTour from "./CardTour";
import Pagination from "./Pagination";
// import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom"

const Home = () => {
  const { tours, loading, currentPage, numberOfPages } = useSelector(state => state.tour);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTours(currentPage));
  }, [currentPage]);


  useEffect((user) => {
    // {console.log(user)}
    if (user ? user.result.roles : "" === "admin") {
      navigate("/admin")
    }
  }, [])
  if (loading) {
    // return <Spinner />;
    return <h2>loading...</h2>
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {tours.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tours Found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {/* {typeof(tours)} */}
              {console.log(tours)}
              {
                tours && tours.map((item, index) => <CardTour key={index} {...item} />)
              }
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      <Pagination
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        dispatch={dispatch}
      />
    </div>
  );
};

export default Home;
