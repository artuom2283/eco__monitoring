import './calculation.css';
import { useState } from 'react';

const CalculationPage = () => {
    const [cancerRisk, setCancerRisk] = useState<number | null>(null);
    const [nonCancerRisk, setNonCancerRisk] = useState<number | null>(null);
    const [LADD, setLADD] = useState<number | null>(null);

    const [C, setC] = useState<number>(0);       
    const [CR, setCR] = useState<number>(0);       
    const [EF, setEF] = useState<number>(0);      
    const [ED, setED] = useState<number>(0);     
    const [BW, setBW] = useState<number>(70);      
    const [AT, setAT] = useState<number>(70);      
    const [RfC, setRfC] = useState<number>(0);     
    const [SF, setSF] = useState<number>(0);      

    const handleCalculate = () => {
      const calculatedLADD = (C * CR * EF * ED) / (BW * AT) * 365;
      setLADD(calculatedLADD);
  
      const HQ = ((C * CR * EF * ED) / (BW * AT) * 365) / RfC;
      setNonCancerRisk(HQ);

      const cancerRiskValue = calculatedLADD * SF;
      setCancerRisk(cancerRiskValue);
  };
  
    return (
        <main className="calculation-main">
            <h3 className="calculation-title">Here you can calculate cancer and non-cancer risk</h3>
            <section className="calculation-form">
                <div className="calculation-field">
                    <label className="calculation-label">Concentration (C, mg/m³): </label>
                    <input className="calculation-input" type="number" value={C} onChange={(e) => setC(Number(e.target.value))} />
                </div>
                <div className="calculation-field">
                    <label className="calculation-label">Air Intake Rate (CR, m³/day): </label>
                    <input className="calculation-input" type="number" value={CR} onChange={(e) => setCR(Number(e.target.value))} />
                </div>
                <div className="calculation-field">
                    <label className="calculation-label">Exposure Frequency (EF, days/year): </label>
                    <input className="calculation-input" type="number" value={EF} onChange={(e) => setEF(Number(e.target.value))} />
                </div>
                <div className="calculation-field">
                    <label className="calculation-label">Exposure Duration (ED, years): </label>
                    <input className="calculation-input" type="number" value={ED} onChange={(e) => setED(Number(e.target.value))} />
                </div>
                <div className="calculation-field">
                    <label className="calculation-label">Body Weight (BW, kg): </label>
                    <input className="calculation-input" type="number" value={BW} onChange={(e) => setBW(Number(e.target.value))} />
                </div>
                <div className="calculation-field">
                    <label className="calculation-label">Averaging Time (AT, years): </label>
                    <input className="calculation-input" type="number" value={AT} onChange={(e) => setAT(Number(e.target.value))} />
                </div>
                <div className="calculation-field">
                    <label className="calculation-label">Reference Concentration (RfC): </label>
                    <input className="calculation-input" type="number" value={RfC} onChange={(e) => setRfC(Number(e.target.value))} />
                </div>
                <div className="calculation-field">
                    <label className="calculation-label">Carcinogenic Slope Factor (SF): </label>
                    <input className="calculation-input" type="number" value={SF} onChange={(e) => setSF(Number(e.target.value))} />
                </div>
                <button className="calculation-button" onClick={handleCalculate}>Calculate Risk</button>
            </section>

            {LADD !== null && (
                <div className="calculation-result">
                    <h4>Calculated average dose per day over the entire period of exposure (LADD): {LADD}</h4>
                </div>
            )}

            {cancerRisk !== null && (
                <div className="calculation-result">
                    <h4>Calculated Carcinogenic Risk (CR): {cancerRisk}</h4>
                </div>
            )}

            {nonCancerRisk !== null && (
                <div className="calculation-result">
                    <h4>Calculated Non-Carcinogenic Risk (HQ): {nonCancerRisk}</h4>
                </div>
            )}
        </main>
    );
};

export default CalculationPage;
