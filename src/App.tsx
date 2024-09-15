import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage';
import PollutionPage from './PollutionPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/pollution-calculation" element={<PollutionPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
