import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './global/Header';

import ClassCard from './component/Classes/ClassCard';

export default function Classes() {
  const [classes, setClasses] = useState([]);

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
    fetchData();
  }, []);

  return (
    <><div className='classes'>
      <Header ofPage="classes" />
      <ul>
        {classes.map((item, index) => (
          <li key={index}>{item.classname}</li>
        ))}
      </ul>
    </div>
    <ClassCard text=' Yoga class' />
    <br></br>
    <ClassCard text=' Zumba Class' />
    <br></br>
    <ClassCard text=' Steps Class' /></>
  );
}
