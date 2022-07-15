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
import { Link } from "react-router-dom";
import { register, reset } from "../redux/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    roles: ""
  });

  const { firstName, lastName, email, password, password2, roles } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user]);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("password not match");
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        roles
      };
      dispatch(register(userData));
      const userRole = userData.roles
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };

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
          <h5>Sign Up</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <div className="col-md-12">
                <MDBInput
                  label="first name"
                  type="name"
                  value={firstName}
                  name="firstName"
                  onChange={onInputChange}
                  required
                  // invalid
                  validation="pls provide your first name"
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="last name"
                  type="name"
                  value={lastName}
                  name="lastName"
                  onChange={onInputChange}
                  required
                  // invalid
                  validation="pls provide your last name"
                />
              </div>
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
              <div className="col-md-12">
                <MDBInput
                  label="password2"
                  type="password"
                  value={password2}
                  name="password2"
                  onChange={onInputChange}
                  required
                  invalid
                  validation="confirm password"
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
                  Sign Up
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/signin">
              <p>Already have an account? Sign in</p>
            </Link>
            <Link to='/adminsignup'>
              <p>Sign up as admin</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </>
  );
}

export default Signup;
