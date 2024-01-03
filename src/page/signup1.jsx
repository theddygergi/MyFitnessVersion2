import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '',
    password: '',
    gender: '',
    height: '',
    weight: '',
    goalID: ''

});

    const handleInputChange = (e) => {
        setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/signup', formData);
      console.log(response.data);
      navigate('/sign-in');
      localStorage.setItem('username',formData.name);
      localStorage.setItem('goalID', formData.goalID);
      localStorage.setItem('logged-in', true);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div>
      <h1>React App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Gender:
          <input type="text" name="gender" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Height:
          <input type="number" name="height" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Weight:
          <input type="number" name="weight" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Goal ID:
          <input type="number" name="goalID" onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
