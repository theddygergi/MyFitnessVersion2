import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import userContext from '../UserContext';
import { Container,Row,Col,Button,Image } from 'react-bootstrap';
import Header from './global/Header';
import Footer from './global/Footer'

import ClassCard from './component/Classes/ClassCard';
import steps from '../../src/assets/classes/steps.jpg';
import yoga from '../assets/classes/yoga.jpg';
import zumba from '../../src/assets/classes/zumba.jpg';


export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [userID, setUserID] = useState('');
  const { userData } = useContext(userContext);

  const fetchUserID = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/userid/${userData.useremail}`
      );
      const { success, user } = response.data;
      if (success) {
        const { userid } = user || {};
        setUserID(userid);
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/classes/`);
      setClasses(response.data);
      console.log(classes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    fetchUserID();
    fetchData();
  }, [userData.useremail]);

  const [bg,setBg]=useState(0)
  let RowBannerStyle;
  if (bg==0){
    RowBannerStyle={
      minWidth:'100vw',
      minHeight:'100vh',
      marginTop:'-12.25vh',
      backgroundImage: `url(${yoga})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      transition:'0.8s',
    }
  }
  if (bg==1){
    RowBannerStyle={
      minWidth:'100vw',
      minHeight:'100vh',
      marginTop:'-12.25vh',
      backgroundImage: `url(${zumba})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      transition:'0.8s',
    }
  }
  if (bg==2){
    RowBannerStyle={
      minWidth:'100vw',
      minHeight:'100vh',
      marginTop:'-12.25vh',
      backgroundImage: `url(${steps})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      transition:'0.8s',
    }
  }

  function handleChangeBg(index){
    setBg(index);
  }

  const handleClick = async (userid, indexFetch) => {
    try {
      const response = await axios.post('http://localhost:8081/api/addusertoclass', {
        userid,
        indexFetch
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding user to class:', error);
    }
  }
  
  return (
    <div>
      <Header ofPage='classes' />
          <div className='d-flex justify-content-center align-items-center' style={RowBannerStyle}>
          <Row fluid sm={1} md={2} lg={5} className="classes-wrapper" style={{width:'100vw'}}  >
            <Col style={{ marginRight: '20px'}}></Col>
            {
              classes.map((item,index)=>(
              <Col onClick={(()=>(handleChangeBg(index)))} className='class-card p-4 border rounded'  style={{ marginRight: '30px', backgroundColor: '#fff', opacity:'0.8',borderColor: '#EB1D25'}}>
                <div className="p-3 text-center">
                    <p className="h2 text-primary text-center">{item.classname}</p>
                    <p className="h5 text-dark text-center">{item.classdescription}</p>
                    <br />
                    { index==bg && <Button onClick={(()=>(handleClick(userID,index+1)))} variant='outline-primary' size='sm' >Join Class</Button>}
                </div>
             </Col>))
             }
             <Col></Col>
          </Row>
          </div>
    </div>
  );
}

{/* <div className='classes m-0 p-0'>
      <Header ofPage="classes" />
      { <ul>
        {classes.map((item, index) => (
          <li key={index}>{item.classname}</li>
        ))}
      </ul> }
    </div> */}

    {/* <ClassCard text=' Yoga class' image= {yoga} />
    <br></br>
    <ClassCard text=' Zumba Class' image={zumba} />
    <br></br>
    <ClassCard text=' Steps Class' image={steps} /> */}