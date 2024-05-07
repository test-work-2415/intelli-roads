import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CoverPage from './coverpage';
import LoginPage from './login';
import SignUpPage from './sign';
import ForgotPasswordPage from './forget';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import Sidebar from './leftbar';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<CoverPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign" element={<SignUpPage />} />
      <Route path="/page1" element={<Page1 />} />
      <Route path="/forget" element={<ForgotPasswordPage />} />
      <Route path="/page2" element={<Page2 />} />
      <Route path="/page3" element={<Page3 />} />
      <Route path="/page4" element={<Page4 />} />
      <Route path="/page5" element={<Page5 />} />
      <Route path="/leftbar" element={<Sidebar />} />
      
      
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default RoutesConfig;
