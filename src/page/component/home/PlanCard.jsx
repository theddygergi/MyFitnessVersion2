import React from 'react'
import {Col,Button} from 'react-bootstrap'

import cardBg from '../../../assets/home/car01.png'

export default function PlanCard({text,onLearnMore,ofPlan}) {
    const cardBackground = {
        backgroundImage: `url(${cardBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    }
    
  return (
        <div className='card d-flex justify-content-center align-items-center mx-4' > {/*  style={cardBackground} */}
            <div className='normalShow d-flex align-items-center justify-content-center' >
                <p className='text-primary p-0 m-0'>{text}</p>
            </div>
            <div className='hoverShow d-flex align-items-center justify-content-center'>
                <Button variant='primary' onClick={(()=>(onLearnMore(ofPlan)))}>Learn More</Button>
            </div>
        </div>
  )
}
