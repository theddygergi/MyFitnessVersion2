import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-bootstrap';
import App from './App';

// Bootstrap
import './style/bootstrap/override.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min';
// Styling Of Components
import './style/global.css';
import './style/sign.css';
import './style/home.css'
import './style/plan.css';
import './style/class.css';
import './style/profile.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} >
    <App />
  </ThemeProvider>
  </React.StrictMode>
);