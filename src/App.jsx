import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import AmberWay from './pages/AmberWay';
import Collection from './pages/Collection';
import Craft from './pages/Craft';
import Contact from './pages/Contact';
import Leadership from './pages/Leadership';
import News from './pages/News';

import AgeVerificationModal from './components/Common/AgeVerificationModal';

function App() {
  return (
    <Router>
      <AgeVerificationModal />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/amber-way" element={<AmberWay />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/craft" element={<Craft />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
