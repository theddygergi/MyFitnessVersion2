import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from './global/Header';
import userContext from '../UserContext';
import UserProfile from './component/profile/UserProfile';
import Chart from './component/profile/Chart';

export default function Profile() {
  const { userData } = useContext(userContext);
  const [userID, setUserID] = useState('');
  const [progress, setProgress] = useState([0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError('Error fetching user ID');
    }
  };

  const getUserProgress = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/userprogress/${userID}`);
      if (response.status === 200) {
        const { userProgress } = response.data;
        console.log('User Progress:', userProgress);
        if([parseInt(userProgress)]>100){
          setProgress(100);
        } else {
          setProgress([parseInt(userProgress)])
        }
       
      } else {
        console.error('Failed to get user progress');
        setError('Failed to get user progress');
      }
    } catch (error) {
      console.error('Error getting user progress:', error);
      setError('Error getting user progress');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserID();
  }, [userData.useremail]);

  useEffect(() => {
    if (userID) {
      getUserProgress();
    }
  }, [userID]);

  const navigate=useNavigate();
  function handleSignIn(){
    navigate('/sign-in');
  }

  return (
    <div className='profile'>
      <Header ofPage="profile" />
      <br />
      {!loading && <UserProfile />}
      {loading && 
        <div className="d-flex align-items-center justify-content-center" style={{height:'70vh',}}>
          <p onClick={(()=>(handleSignIn()))} className="link-to-signin h1 text-center text-primary">LOG IN TO VIEW</p>
        </div>
      }
      {error && <p>Error: {error}</p>}
      {!loading && !error && <Chart data={progress} />}
    </div>
  );
}
