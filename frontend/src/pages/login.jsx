import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBValidation,
  MDBInput,
  MDBContainer,
  MDBSpinner,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../redux/features/auth/authSlice";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    roles:""
  });

  const { email, password, roles} = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // if (isError) {
    //   // toast.error(message);
    // }
    if (isSuccess || user) {
      const userRole = formData.roles
      console.log(userRole)
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
    dispatch(reset);
  }, [user]);

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password || !roles){
      alert("Please input all fields")
    } else{
      const userData = {
        email,
        password,
        roles,
      };
      dispatch(login(userData));
    }
  };

  const googleFailure = ()=>{}
  const googleSuccess = ()=>{}

  return (
    <>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "500px",
          alignContent: "center",
          marginTop: "120px",
        }}
      >
        <MDBCard>
          <MDBIcon icon="user-circle" className="fa-2x" />
          <h5>Sign in</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <div className="col-md-12">
                <MDBInput
                  label="email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={onInputChange}
                  required
                  invalid
                  validation="pls provide your email"
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={onInputChange}
                  required
                  invalid
                  validation="pls provide your password"
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="roles"
                  type="roles"
                  value={roles}
                  name="roles"
                  onChange={onInputChange}
                  required
                  invalid
                  validation="pls provide your roles"
                />
              </div>
              <div className="col-12">
                <MDBBtn
                  style={{ width: "100%" }}
                  className="mt-2"
                  type="submit"
                >
                  {isLoading && (
                    <MDBSpinner
                      size="sm"
                      role="status"
                      tag="span"
                      className="me-2"
                    />
                  )}
                  Login
                </MDBBtn>
              </div>
            </MDBValidation>
            <br />
            <GoogleLogin
              clientId=""
              render={(renderProps) => (
                <MDBBtn
                  style={{ width: "100%" }}
                  color="danger"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <MDBIcon className="me-2" fab icon="google"/>Google Sign In
                </MDBBtn>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/signup">
              <p>Don't have an account? Sign up</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </>
  );
}

export default Login;
