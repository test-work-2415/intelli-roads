import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './mycomp/route'; // Adjust the path as necessary


function App() {
  return (
    <Router>
      <RoutesConfig /> 
    </Router>
   

 
  );
}

export default App;

/*
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './mycomp/route';  // Adjust the path as necessary

import CoverPage from './mycomp/coverpage'; // Adjust the path as needed
import LoginPage from './mycomp/login';
import SignUpPage from './mycomp/sign';
import ForgotPasswordPage from './mycomp/forget';
import Page1 from './mycomp/page1';
import Page2 from './mycomp/page2';
import Page3 from './mycomp/page3';
import Page4 from './mycomp/page4';
import Page5 from './mycomp/page5';


function App() {
  return (
    <div className="App">

      <CoverPage />
      <LoginPage />
      <SignUpPage />
      <ForgotPasswordPage />
      <Page1/>
      <Page2/>
      <Page3/>
      <Page4/>
      <Page5/>
      <Router> 
        <RoutesConfig /> 
      </Router>
      
      
    </div>
  );
}

export default App;
*/