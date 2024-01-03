import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { Form, FloatingLabel, Button, Container, Col , Row, Image } from "react-bootstrap";


import logo from '../assets/logo-tall.png';
import { FaDoorClosed } from "react-icons/fa6";

import userContext from "../UserContext";

export default function SignUp({comeBackToSignIn,stateComeBackToSignIn}) {
  const navigate = useNavigate();
  const {setUserData} = useContext(userContext);
  const [formData, setFormData] = useState({ 
    sname: '', 
    semail: '',
    spassword: '',
    sheight: '',
    sweight: '',
    sgender: '',
    sgoalID: ''
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmitSignUp = async (e) => {
    console.log("button pressed");
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/signup', formData);
      
      setUserData({ useremail: formData.semail });
      console.log(response.data);
      setError(null);
  
      const userIDResponse = await axios.get(`http://localhost:8081/api/userid/${formData.semail}`);
      const userID = userIDResponse.data.user.userid;
      const defaultProgress = await axios.post(`http://localhost:8081/api/userprogress/${userID}`);
  
      navigate('/sign-in');
    } catch (error) {
      console.error('Error posting data:', error);
      setError("Error in sign up process");
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
        <Col className="sign-up p-3">
          <Form onSubmit={handleSubmitSignUp} className="mt-5">
            <Form.Group controlId="sname">
              <FloatingLabel
                controlId="sign-up-sname"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={formData.sname}
                  name="sname"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="semail">
              <FloatingLabel
                controlId="sign-up-semail"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  value={formData.semail}
                  name="semail"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="spassword">
              <FloatingLabel
                controlId="sign-up-spassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={formData.spassword}
                  name="spassword"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <div className="d-flex justify-content-around align-items-center">
            <Form.Group controlId="sheight">
              <FloatingLabel
                controlId="sign-up-sheight"
                label="Height in CM"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter your height in cm"
                  value={formData.sheight}
                  name="sheight"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="sweight">
              <FloatingLabel
                controlId="sign-up-sweight"
                label="Weight"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter your weight"
                  value={formData.sweight}
                  name="sweight"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            </div>

            <div className="d-flex justify-content-around align-items-center">
            <Form.Group controlId="sgender">
              <FloatingLabel
                controlId="sign-up-sgender"
                label="Gender"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter M or F"
                  value={formData.sgender}
                  name="sgender"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="sgoalID">
              <FloatingLabel
                controlId="sign-up-sgoalID"
                label="Goal"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter your goal"
                  value={formData.sgoalID}
                  name="sgoalID"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="d-flex justify-content-between align-items-center mt-3 p-3">
              <div className="not-signed-in-message">
                <p className="h6 text-dark m-0">Have an accoun? </p>
                <Button onClick={(()=>(navigate('/sign-in')))} size='sm' variant="outline-primary" className="p-0 bg-transparent border-0 text-primary pulse ">Sign In</Button>
              </div>
                <button type="submit" className="btn btn-outline-primary pulse sign-up-btn">
                  Sign Up
                </button>
            </div>
          </Form>
        </Col>  
      </Row>
    </Container>
  )
}

