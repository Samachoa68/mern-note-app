import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import learnLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => {
    logoutUser();
  };
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand
        className="font-weight-bolder text-white"
        style={{ marginLeft: 3 }}
      >
        <img
          src={learnLogo}
          alt="Learn logo"
          width="32"
          height="32"
          className="mr-2"
        />
        Learn App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>
        </Nav>
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav style={{ marginRight: 3 }}>
        <Nav.Link className="font-weight-bolder text-white" disabled>
          Hello {username}
        </Nav.Link>
        <Button variant="secondary" onClick={logout}>
          <img
            src={logoutIcon}
            alt="Logout Icon"
            width="32"
            height="32"
            className="mr-2"
          />
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default NavbarMenu;
