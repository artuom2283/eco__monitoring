import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import PollutionPage from './pages/pollution/PollutionPage';
import CalculationPage from "./pages/calculation/CalculationPage";
import {Header} from "./layout/Header";
import {Footer} from "./layout/Footer";

const App: React.FC = () => {
    return (
        <Router>
            <Header/>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/pollution" element={<PollutionPage/>}/>
                    <Route path="/calculation" element={<CalculationPage/>}/>
                </Routes>
            </div>
            <Footer/>
        </Router>
    );
};

export default App;
