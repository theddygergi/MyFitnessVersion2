import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image,Offcanvas,Button,Icon } from 'react-bootstrap';

import logo from '../../assets/logo-tall.png' 

import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";
import { RiMenuUnfoldLine } from "react-icons/ri";

export function NavMenu({ofPage,status}) {
  return (
    <div className='m-2 d-none d-lg-flex justify-content-center nav-menu'>
      { 
        ofPage==='home'
        ?( <div className='nav-container h5'><div className='nav-item active' >Home</div></div> )
        :( <div className='nav-container h5'><Link to="/">Home</Link></div> )
      }
      { 
        ofPage==='classes'
        ?( <div className='nav-container h5'><div className='nav-item active' >Classes</div></div> )
        :( <div className='nav-container h5'><Link to="/classes">Classes</Link></div> )
      }
      { 
        ofPage==='plans'
        ?( <div className='nav-container h5'><div className='nav-item active' >Plans</div></div> )
        :( <div className='nav-container h5'><Link to="/plans">Plans</Link></div> )
      }
      { 
        ofPage==='profile'
        ?( <div className='nav-container h5'><div className='nav-item active ' >Profile</div></div> )
        :( <div className='nav-container h5'><Link to="/profile">Profile</Link></div> )
      }
      { /* !signedIn */
        status===true && (<div className='nav-container h5 nav-to-si'><Link to="/sign-in">Sign IN</Link></div>)
      }
    </div>
  )
}

export function NavToggle({ofPage,status}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="nav-toggle m-3 mb-0">
      <Button variant="outline-primary mb-2" className="d-lg-none" onClick={handleShow}><RiMenuUnfoldLine/></Button>
      <Offcanvas show={show} onHide={handleClose} responsive="lg" className="d-lg-none"  placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>MyFitness</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="toggle-wrapper">
            <div className="toggle">
              { 
                ofPage==='home'
                ?( <div className='toggle-container h5 text-dark'><div className='toggle-item active' >Home</div></div> )
                :( <div className='toggle-container h5 text-dark'><Link to="/">Home</Link></div> )
              }
              { 
                ofPage==='classes'
                ?( <div className='toggle-container h5 text-dark'><div className='toggle-item active' >Classes</div></div> )
                :( <div className='toggle-container h5 text-dark'><Link to="/classes">Classes</Link></div> )
              }
              { 
                ofPage==='plans'
                ?( <div className='toggle-container h5 text-dark'><div className='toggle-item active' >Plans</div></div> )
                :( <div className='toggle-container h5 text-dark'><Link to="/plans">Plans</Link></div> )
              }
              { 
                ofPage==='profile'
                ?( <div className='toggle-container h5 text-dark'><div className='toggle-item active' >Home</div></div> )
                :( status && (<div className='toggle-container h5 text-dark'><Link to="/profile">Profile</Link></div>) )
              }
              { /* !signedIn */
                status && (<div className='nav-container h5 nav-to-si'><Link to="/sign-in">Sign IN</Link></div>)
              }
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default function Header({ofPage,signedIn}) {
  return (
    <div className="header-wrapper m-1  align-items-center">
      <ScrollToTop smooth component={<IoIosArrowUp color="#EB1D25" />} style={{backgroundColor:'#f8f9fa'}}/>
      <br />
      <div className='d-flex justify-content-between align-items-center header'>
        <div className="header-item header-logo m-3 mt-0 mb-0"><Link to="/" ><Image src={logo} style={{width:'150px',height:'40px',cursor:'pointer' ,opacity:'0.95'}}/></Link></div>
        <NavMenu ofPage={ofPage} status={signedIn} />
        <NavToggle ofPage={ofPage} status={signedIn} />
      </div>
      <br />
      <div className="hr-wrapper">
        <hr/>
      </div>
    </div>
  )
}

Header.defaultProps={
  signedIn:true,
}

Header.propTypes={
  signedIn:PropTypes.bool,
}