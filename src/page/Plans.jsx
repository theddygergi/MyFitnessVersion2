import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Header from './global/Header';
import userContext from '../UserContext';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [meals, setMeals] = useState([]);
  const [goalID, setGoalID] = useState('');
  const { userData } = useContext(userContext);

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
      console.log(response.data);
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
    <div>
      <div className='plans'>
        <Header ofPage="plans" />
        <ul>
          {plans.map((item, index) => (
            <li key={index}> 
            {item.exerciseid} {item.exercisename} {item.exercisenbofsets}</li>
          ))}
        </ul>
      </div>
      <br/>
      <div>
        <ul>
          {meals.map((item, index) => (
            <li key={index}>{item.foodname}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
