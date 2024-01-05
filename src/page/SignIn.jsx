import axios from "axios";
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { Form, FloatingLabel, Button, Container, Col , Row, Image } from "react-bootstrap";

import logo from '../assets/logo-tall.png';
import { FaDoorClosed } from "react-icons/fa6";
import { useContext } from "react";

import userContext from "../UserContext";

const SignIn = () => {
  const {setUserData} = useContext(userContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmitSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:8081/api/signin", {
          params: {
              username,
              password,
          },
      });
      if (response.data.success) {
          console.log("log-in success")
          setError(null);
          navigate('/plans');
          
      } else {
          setError("Invalid USERNAME or PASSWORD");
      }
  } catch (error) {
      console.error("Error during login:", error.message);
      setError("An error occurred during login");
  }
  };  

  const handleNavigateHome = () => {
    navigate('/');
  }

  return (
    <Container fluid className="sign-container bg-primary vh-100 d-flex align-items-center justify-content-center" >
      <Row sm={1} className="sign-row bg-light border rounded p-5">
        <Col className="sign-header d-flex justify-content-between align-items-center">
          <div className="sign header-item header-logo pulse"><Link to="/" ><Image src={logo} style={{width:'150px',height:'40px',cursor:'pointer' ,opacity:'0.95'}}/></Link></div>
          <div className="sign-header-item sign-header-item-close"><Button onClick={(()=>(handleNavigateHome()))} size='lg' variant="outline-primary" className="bg-transparent border-0 text-primary opacity-transition"><FaDoorClosed style={{width:'20px',height:'20px' ,opacity:'0.95'}}/></Button></div>
        </Col>
        <Col className="sign-in p-3">
          <Form onSubmit={handleSubmitSignIn} className="mt-5">
            <Form.Group controlId="username">
              <FloatingLabel
                controlId="sign-in-username"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  name="username"
                  onChange={(e) => {
                    setUserData({ ...userContext, useremail: e.target.value });
                    setUsername(e.target.value);
                  }}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="password">
              <FloatingLabel
                  controlId="sign-in-password"
                  label="Password"
                  className="mb-3"
                >
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              </FloatingLabel>
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <div className="d-flex justify-content-between align-items-center mt-3 p-3">
              <div className="not-signed-in-message">
                <p className="h6 text-dark m-0">Don't have an account?</p>
                <Button onClick={(()=>(navigate('/sign-up')))} size='sm' variant="outline-primary" className="p-0 bg-transparent border-0 text-primary pulse ">Sign Up</Button>
              </div>
              <Button size="sm" variant="outline-primary pulse sign-in-btn" type="submit" >
                Sign In
              </Button>
            </div>
          </Form>
        </Col>  
      </Row>
    </Container>
  );
};

export default SignIn;
