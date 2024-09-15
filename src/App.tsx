import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import PollutionPage from './pages/pollution/PollutionPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pollution" element={<PollutionPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
