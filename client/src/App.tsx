import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import PollutionPage from './features/pollution/PollutionPage';
import CalculationPage from "./features/calculation/CalculationPage";
import { Header } from './app/layout/Header';
import { Footer } from './app/layout/Footer';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/pollution" element={<PollutionPage />} />
                    <Route path="/calculation" element={<CalculationPage />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};



export default App;
