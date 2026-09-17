import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GoogleAnalytics from './components/GoogleAnalytics';
import Home from './pages/Home';
import About from './pages/About';
import Support from './pages/Support';
import Shop from './pages/Shop';

const App: React.FC = () => {
  return (
    <Router>
      <GoogleAnalytics />
      <div className="app">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
