import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { Route, Redirect } from "react-router-dom";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRout = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <>
              <NavbarMenu />
              <Component {...rest} {...Component} />
            </>
          ) : (
            <>
              <Redirect to="/login" />
            </>
          )
        }
      />
    </div>
  );
};

export default ProtectedRout;
