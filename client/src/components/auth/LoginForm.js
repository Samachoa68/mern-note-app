import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  //Context
  const { loginUser } = useContext(AuthContext);

  //Route
  const history = useHistory();

  //Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        history.push("/dashboard");
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group className="my-2">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" className="my-2">
          Login
        </Button>
      </Form>

      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
