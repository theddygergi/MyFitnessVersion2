import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container,Row,Col,Image,Button,Carousel} from 'react-bootstrap';  

import Header from './global/Header';
import Footer from './global/Footer';

import PlanCard from './component/home/PlanCard';

import axios from 'axios';

import background from '../assets/home/hero.png';
//import sample from '../assets/home/mini-sample.png';
import plansBackground from '../assets/home/banner03.jpg';
import car02 from '../assets/home/car02.png';
import car03 from '../assets/home/car03.jpg';
import car04 from '../assets/home/car04.jpg';
import car05 from '../assets/home/car05.jpg';
import car06 from '../assets/home/car06.jpg';
import mockup from '../assets/home/mockup.jpg'

const Home = () => { 
  localStorage.clear();

  const navigate=useNavigate();
  const [looseWeight,setLooseWeight]=useState(false);
  const [gainWeight,setGainWeight]=useState(false);
  const [buildMuscle,setBuildMuscle]=useState(false);
  const [gotFromHome,setGotFromHome]=useState(false);

  const handleJoinClass = () => {
    navigate('/classes');
  };

  localStorage.setItem('navigatedToClass',gotFromHome);
  const handleLearnMore=(plan)=>{
    if(plan==='lw'){setLooseWeight(true)}
    else if(plan==='gw'){setGainWeight(true)}
    else {setBuildMuscle(true)}

    setGotFromHome(true);

    localStorage.setItem('navigatedToClass',gotFromHome);

    navigate('/plans');
  };

  const heroStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100vw',
    position:'absolute',
    marginTop:'-12vh',
    zIndex: -10,
  };
  const postHeroStyle = {
    marginTop:'100vh',
  }
  const plans = {
    backgroundImage: `url(${plansBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundOppacity:0.9,
    minHeight: '100vh',
    width: '100vw',
  };
  
  return (
    <div className='home-page position-relative'>
      <Header ofPage="home" />

      <div className="hero-section" style={heroStyle}>
        <div className='h1 fw-light hero-header'>Your Fitness Guide At <a className='hero-animation'>Home</a></div>
      </div>
      
      <div style={postHeroStyle}>
        <Row sm={1} md={2}>
          <Col className='d-glex d-lg-none justify-content-center align-items-center p-3 float'>
            <Image src={mockup} style={{width:'400px'}} />
          </Col>
          <Col className='p-3 d-flex align-items-center justify-content-center'>
            <div className='mx-3'>
              <p className='h3 px-3 mx-3 mb-3'>Pick the class that suits your comfort</p>
              <p className='h6 p-3 mx-3 my-2 '>Welcome to our fitness app, where a diverse library of classes awaits to cater to your unique habits and preferences. Whether you're an early riser or a night owl, a yoga enthusiast or a high-intensity workout lover, we have a variety of classes designed to fit effortlessly into your lifestyle. Our platform offers a rich variety of workouts led by experienced instructors, ensuring there's something for everyone.<br/>So...What are you waiting for?</p>
              <div className="px-3 mx-3 mt-3"> <Button onClick={() => handleJoinClass()} className='p-0 bg-transparent border-0 text-primary pulse' variant='outline-primary'>Join a Class</Button> </div>
            </div>
          </Col>
          <Col className='d-none d-lg-flex justify-content-center align-items-center p-3 float'>
            <Image src={mockup} style={{width:'400px'}} />
          </Col>
        </Row>
      </div>

      <br /><br />

      <Container fluid className="d-flex justify-content-around align-items-center plans-section" style={plans}> 
        <div>
          {/* <p className="text-primary text-center title-of-plans">Plans</p> */}
          <Row sm={1} md={2} lg={3} className='text-center'>
            <Col>
              <PlanCard text='Loose Weight' onLearnMore={handleLearnMore} ofPlan='lw' desc='Your journey through your new self starts here'/>
            </Col>
            <Col>
            <PlanCard text='Gain Weight' onLearnMore={handleLearnMore} ofPlan='gw' desc='The only limits you got are the ones you put to yourself'/>
            </Col>
            <Col>
            <PlanCard text='Build Muscle' onLearnMore={handleLearnMore} ofPlan='bm' desc='Unlock your true potential'/>
            </Col>
          </Row>
        </div>
      </Container>

      <Container fluid>
        <br /><br />
        <p className='h1 text-dark text-center'>#RAISETHEBAR</p>
        <br />
        <Carousel fade data-bs-theme="dark">
            <Carousel.Item><Image src={car02} style={{width:"500px",height:'400px'}}/></Carousel.Item>
            <Carousel.Item><Image src={car03} style={{width:"500px",height:'400px'}}/></Carousel.Item>
            <Carousel.Item><Image src={car04} style={{width:"500px",height:'400px'}}/></Carousel.Item>
            <Carousel.Item><Image src={car05} style={{width:"500px",height:'400px'}}/></Carousel.Item>
            <Carousel.Item><Image src={car06} style={{width:"500px",height:'400px'}}/></Carousel.Item>
        </Carousel>
      </Container>

      <Footer />
    </div>
  );
};

export default Home;


// const goalID = localStorage.getItem('goalID');
//   let goalType = '';
//   if(goalID == 1){
//     goalType = 'lose weight';
//   }
//   if(goalID == 2){
//     goalType = 'gain weight';
//   }
//   if(goalID == 3){
//     goalType = 'gain muscle';
//   }
//   const name = localStorage.getItem('username');
// { <div>
//   Hello, {name}, welcome! Your goal is to {goalType}
// </div>}