import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarItem,
  MDBNavbarLink,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from '../redux/features/auth/authSlice'

import { useNavigate } from "react-router-dom";
import { searchTour } from "../redux/features/tour/tourSlice";
import { useEffect } from "react";

function Header() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("")
  const [name, setName] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  console.log(user)
  const onLogout = () => {
    if (user ? user.result.roles : "" === "admin") {
      dispatch(logout())
      dispatch(reset())
      navigate('/')
    }
    dispatch(logout())
    dispatch(reset())
    navigate('/signup')
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      // console.log(search)
      dispatch(searchTour(search))
      navigate(`/tours/search?searchQuery=${search}`)
      setSearch("")
    } else {
      navigate('/')
    }
  }
  useEffect((user) => {
    if (user ? user.result.roles : "" === "admin") {
      setName(`Logged in as admin (${user ? user.result.name : ""})`)
    } else {
      setName(`welcome ${user ? user.result.name : ""}`)
    }
  }, [])

  // if(!user) return <></>

  // console.log(user)
 
  return (
    <>
      <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
        <MDBContainer>
          <MDBNavbarBrand
            href="/"
            style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
          >
            TourApp
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toogle navigation"
            onClick={() => setShow(!show)}
            style={{ color: "#606080" }}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse show={show} navbar>
            <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink href="/">
                  <p className="header-text">Home</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
               {user && user.result.roles === "admin" ? (
                <>

                </>
              ) : (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/addTour">
                      <p className="header-text">Add Tour</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/dashboard">
                      <p className="header-text">Dashboard</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )} 
              {user && user.result._id ? (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink>
                      <p className="header-text  text-primary">{name}</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink>
                      <button className="header-text btn text-primary" onClick={onLogout}>Logout</button>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              ) : (
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login">
                    <p className="header-text">Login</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              )} 
            </MDBNavbarNav>
            {
              user && user.result.roles === "admin" ? (
                <>
                </>
              ) : (
                <form action="" className="d-flex inpput-group w-auto" onSubmit={handleSubmit}>
                  <input type="text"
                    className="form-control"
                    value={search}
                    placeholder="Search tours"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div style={{ marginTop: "5px", marginLeft: "5px" }}>
                    <MDBIcon fas icon="search" />
                  </div>
                </form>
              )
            } 
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}

export default Header;
