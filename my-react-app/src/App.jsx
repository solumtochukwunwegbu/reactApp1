// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/index/index';
import AboutPage from './pages/about/about';
import { Header, Footer } from './layout';
import CalculatorPage from './pages/calculator/calculator'; 

export default function App() {
  return (
    <div>
      <Header />
      
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
      </Routes>
      
      <Footer />
    </div>
  );
}
