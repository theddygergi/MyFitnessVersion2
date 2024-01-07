import React from 'react';
import { Col, Button } from 'react-bootstrap';

import cardbg01 from '../../../assets/home/2.png';
import cardbg02 from '../../../assets/home/4.png';
import cardbg03 from '../../../assets/home/6.png';

export default function PlanCard({ text, onLearnMore, ofPlan, desc }) {
  let cardBackground;

  if (ofPlan === 'lw') {
    cardBackground = {
      backgroundImage: `url(${cardbg01})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };
  } else if (ofPlan === 'gw') {
    cardBackground = {
      backgroundImage: `url(${cardbg02})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };
  } else {
    cardBackground = {
      backgroundImage: `url(${cardbg03})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };
  }

  return (
    <div onClick={(()=>(onLearnMore()))} className='card d-flex justify-content-center align-items-center mx-4' style={cardBackground}>
      <div className='normalShow d-flex align-items-center justify-content-center'>
        <p className='text-light h1 p-0 m-0'>{text}</p>
      </div>
      <div className='hoverShow d-flex align-items-center justify-content-center'>
        <p className='text-light h3 p-0 m-0' >{desc}</p>
        {/* <Button variant='primary' onClick={() => onLearnMore(ofPlan)}>
          Learn More
        </Button> */}
      </div>
    </div>
  );
}
