import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import axios from "axios";

import Header from "./global/Header";
import userContext from "../UserContext";
import Footer from "./global/Footer";
import Plan from "./component/plan/Plan";
import { useNavigate } from "react-router-dom";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [meals, setMeals] = useState([]);
  const [goalID, setGoalID] = useState("");
  const [userID, setUserID] = useState("");
  const [workoutID, setWorkoutID] = useState("");
  const [exerciseID, setExerciseID] = useState("");
  const { userData } = useContext(userContext);

  const [workout, setWorkout] = useState({});
  let [wnb, setWnb] = useState(0);
  const [ShowOnlyMeal, setShowOnlyMeal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNextExercice = (currentNb) => {
    
    console.log("button clicked: ", currentNb);
    if (currentNb < 11) {
      setWnb(currentNb + 1);
      
    } else {
      setShowOnlyMeal(true);
    }
    const currentWorkout = plans[currentNb];
    const exerciseid = currentWorkout ? currentWorkout.exerciseid : "";
    const workoutid = currentWorkout ? currentWorkout.workoutid : "";
    setExerciseID(exerciseid);
    setWorkoutID(workoutid);

  
    plans.forEach((newTarget, index) => {
      if (index === currentNb + 1) {
        setWorkout(newTarget);
        achieveWorkout(userID, goalID, workoutID, exerciseID);
        addProgress();
      }
    });
  
  };


  const addProgress = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/addgoalprogress/${userID}`,
        {}
      );
      if (response.status === 200) {
        console.log("Progress added successfully");
      } else {
        console.error("Failed to add progress");
      }
    } catch (error) {
      console.error("Error adding progress:", error);
    }
  };

  const achieveWorkout = async (userid, goalid, workoutid, exerciseid) => {
    try {
      await axios.post(`http://localhost:8081/api/updateprogress`, {
        userid,
        goalid,
        workoutid,
        exerciseid,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

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

  const fetchID = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/goalid/${userData.useremail}`
      );
      const { success, user } = response.data;

      if (success) {
        const { goalid } = user || {};
        setGoalID(goalid);
      } else {
        console.error("Error fetching goal ID:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching goal ID:", error);
    }
  };

  const fetchMealData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/mealplan/${goalID}`
      );
      const mealsData = response.data.data || [];
      setMeals(mealsData);
    } catch (error) {
      console.error("Error fetching meal data: ", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/exongoal/${goalID}`
      );
      setPlans(response.data);
      setWorkout(response.data[0]);
      setPlans(response.data);
      console.log(response.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching plan data:", error);
    }
  };

  useEffect(() => {
    fetchUserID();
    fetchID();
  }, [userData.useremail]);

  useEffect(() => {
    if (goalID) {
      fetchData();
      fetchMealData(); 
    }
  }, [goalID]);

  
  const navigate=useNavigate();
  function handleSignIn(){navigate('/sign-in')}

  if (ShowOnlyMeal) {
    return (
      <Container fluid className="p-0">
        <Row fluid>
          <Header ofPage="plans" />
        </Row>
        { !loading && 
        <Row className="bg-primary  plans-container p-3">
          <br />
          <Col className="p-3" sm={4}>
            <div className="p-3">
              <div className="plan-diet mt-3 p-3 bg-light">
                <br />
                <div className="h3 text-primary text-center">Meal Plan</div>
                <div className="p-3">
                  {meals.map((item, index) => (
                    <p key={index}>
                      Meal {index + 1} : {" "}{item.foodname}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Col>
          <Col
            className="p-3 d-flex align-items-center justify-content-center"
            sm={8}
          >
            <div className=" p-3">
              <div className="p-3">
                <div className=" p-4">
                  <br />
                  <p className="h1 text-center text-light float">GOOD JOB</p>
                  <br />
                  <p className="text-light">
                    Your body deserve to rest and eat well!
                  </p>
                  <br />
                </div>
              </div>
            </div>
          </Col>
        </Row>}
        {loading && 
          <div className="d-flex align-items-center justify-content-center" style={{height:'60vh',}}>
            <p onClick={(()=>(handleSignIn()))} className="link-to-signin h1 text-center text-primary">LOG IN TO VIEW</p>
          </div>
        }
        <Row>
          <Footer />
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0">
      <Row fluid>
        <Header ofPage="plans" />
      </Row>
       <br />
      { !loading &&
        <Row className="bg-primary  plans-container p-3">
        <Col className="p-3" sm={4}>
          <div className="p-3">
            <div className="bg-light p-4 mb-3 plan-header">
              {goalID == "1" ? (
                <p className="h3 text-primary text-center">Lose Weight</p>
              ) : goalID == "2" ? (
                <p className="h3 text-primary text-center">Gain Weight</p>
              ) : goalID == "3" ? (
                <p className="h3 text-primary text-center">Build Muscle</p>
              ) : (
                <p className="h3 text-primary text-center">Your Plan</p>
              )}
              <br />
              {plans.map((item, index) => (
                <p className={index === wnb ? "text-primary" : ""} key={index}>
                  Exercice {index + 1} : {item.exercisename}{" "}
                </p>
              ))}
            </div>
            <div className="plan-diet mt-3 p-3 bg-light">
              <br />
              <div className="h3 text-primary text-center">Meal Plan</div>
              <div className="p-3">
                {meals.map((item, index) => (
                  <p key={index}>
                    Meal {index + 1} :{item.foodname}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Col>
        <Col className="p-3 plan-exercice " sm={8}>
          <Plan
            onNext={handleNextExercice}
            currentNb={wnb}
            currentWorkout={workout}
          />
        </Col>
        </Row>
      }
      {loading && 
        <div className="d-flex align-items-center justify-content-center" style={{height:'70vh',}}>
          <p onClick={(()=>(handleSignIn()))} className="link-to-signin h1 text-center text-primary">LOG IN TO VIEW</p>
        </div>
      }
      { !loading &&
        <Row>
        <Footer />
      </Row>
      }
    </Container>
  );
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
