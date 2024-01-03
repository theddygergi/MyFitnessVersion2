import React, { useState, useEffect, useContext } from 'react';
import {
  Container,Row,Col,Image,Button
} from 'react-bootstrap';
import axios from 'axios';

import Header from './global/Header';
import userContext from '../UserContext';
import Footer from './global/Footer';
import Plan from './component/plan/Plan';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [meals, setMeals] = useState([]);
  const [goalID, setGoalID] = useState('');
  const { userData } = useContext(userContext);

  const [workout,setWorkout]=useState({});
  let [wnb,setWnb]=useState();

  // const [active,setActive]=useState(0);

  function handleNextExercice(currentWorkoutId){
      console.log('button clicked')
  }

  const fetchID = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/goalid/${userData.useremail}`);
      const { success, user } = response.data;
  
      if (success) {
        const { goalid } = user || {};
        setGoalID(goalid);
      } else {
        console.error('Error fetching goal ID:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching goal ID:', error);
    }
  };
  

  const fetchMealData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/mealplan/${goalID}`);
      const mealsData = response.data.data || [];
      setMeals(mealsData);
    } catch (error) {
      console.error('Error fetching meal data: ', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/exongoal/${goalID}`);
      setPlans(response.data);
      setWorkout(plans[0])
      setWnb( plans[0].exerciseid )
      setPlans(response.data);
      console.log(response.data);
      console.log(workout)
      console.log(wnb)
    } catch (error) {
      console.error('Error fetching plan data:', error);
    }
  };

  useEffect(() => {
    fetchID();
  }, [userData.useremail]);

  useEffect(() => {
    if (goalID) {
      fetchData();
      fetchMealData();
    }
  }, [goalID]);

  return (
    <Container fluid className='p-0'>
      <Row fluid>
        <Header ofPage="plans" />
      </Row>
      <br />
      <Row className='bg-primary  plans-container p-3'>
        <Col className='p-3' sm={4}>
           <div className='p-3'>
                <div className='bg-light p-4 mb-3 plan-header'>
                  {
                    goalID == '1'
                      ? <p className='h3 text-primary text-center'>Lose Weight</p>
                      : goalID == '2'
                        ? <p className='h3 text-primary text-center'>Gain Weight</p>
                        : goalID == '3'
                          ? <p className='h3 text-primary text-center'>Build Muscle</p>
                          : <p className='h3 text-primary text-center'>Your Plan</p>
                  }
                  <br />
                  {plans.map((item, index) => (
                    <p className={item.exerciseid === wnb ? 'text-primary' : ''} key={index}>
                      Exercice {index + 1} : {item.exerciseid} {item.exercisename} {item.exercisenbofsets}
                    </p>
                  ))}

              </div>
              <div className='plan-diet mt-3 p-3 bg-light'>
                <br />
                <div className="h3 text-primary text-center">Meal Plan</div>
                <div className="p-3">
                  {meals.map((item, index) => (
                    <p key={index}>Meal {index+1} :{item.foodname}</p>
                  ))}
                </div>
              </div>
           </div>
          </Col>
          <Col className='p-3 plan-exercice ' sm={8}>
            <Plan onNext={handleNextExercice} currentId={wnb} currentWorkout={workout} />
          </Col>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container> 
  )
}

    // <div>
    //   <div className='plans'>
    //     <Header ofPage="plans" />
    //     <ul>
    //       {plans.map((item, index) => (
    //         <li key={index}> 
    //         {item.exerciseid} {item.exercisename} {item.exercisenbofsets}</li>
    //       ))}
    //     </ul>
    //   </div>
    //   <br/>
    //   <div>
    //     <ul>
    //       {meals.map((item, index) => (
    //         <li key={index}>{item.foodname}</li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>