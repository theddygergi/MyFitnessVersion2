import React from 'react'
import {Container,Row} from 'react-bootstrap';

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
        <br /><br />
        <div className="hr-wrapper"><hr/></div>
        <br /><br />
        <div className="bg-primary">
          <p className="text-light d-flex justify-content-center align-items-center"> MyFitness All Rights Reserved &copy; {currentYear}</p>
        </div>
    </div>
  )
}