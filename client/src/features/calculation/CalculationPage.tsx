import './calculation.css';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
    addRiskAsync,
    fetchRisksAsync
} from "../pollution/pollutionSlice";
import { SuccessNotification } from "../../components/SuccessNotification";
import { RiskDto } from "../../app/models/Risk";
import { RiskInfoTable } from "../../components/Tables/RiskInfoTable";
import { TopButton } from "../../components/Buttons/TopButton";

type CalculationType = 'airEmission' | 'waterDamage' | 'waterDischarge';

const CalculationPage = () => {
    const [C, setC] = useState<number>(0);
    const [CR, setCR] = useState<number>(0);
    const [EF, setEF] = useState<number>(0);
    const [ED, setED] = useState<number>(0);
    const [BW, setBW] = useState<number>(70);
    const [AT, setAT] = useState<number>(70);
    const [RfC, setRfC] = useState<number>(0);
    const [SF, setSF] = useState<number>(0);

    const [calculationType, setType] = useState<string>('');

    const dispatch = useAppDispatch();

    const risksLoaded = useAppSelector(state => state.pollution.risksLoaded);

    useEffect(() => {
        const loadData = async () => {
            if (!risksLoaded) await dispatch(fetchRisksAsync());
        };

        loadData();
    }, [risksLoaded, dispatch]);

    const [newRisk, setNewRisk] = React.useState({
        id: 0,
        substanceName: '',
        calculationType: '',
        result: 0,
    });

    const handleAddRiskChange = (field: keyof RiskDto | string, value: any) => {
        setNewRisk(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddRisk = async () => {
        try {
            console.log("Adding new risk:", newRisk);
            newRisk.result = handleCalculate();
            await dispatch(addRiskAsync(newRisk)).unwrap();
            SuccessNotification();
            console.log("New risk added successfully!");
            setNewRisk({
                id: 0,
                substanceName: '',
                calculationType: '',
                result: 0
            });
            clearFields();
            await dispatch(fetchRisksAsync());
        } catch (error) {
            console.error("Error adding report:", error);
        }
    };

    const clearFields = () => {
        setC(0);
        setCR(0);
        setEF(0);
        setED(0);
        setBW(70);
        setAT(70);
        setRfC(0);
        setSF(0);
    };

    const handleCalculate = () => {
        let result;
        const calculatedLAAD = (C * CR * EF * ED) / (BW * AT) * 365;
        switch (calculationType) {
            case 'LAAD Type':
                result = calculatedLAAD;
                newRisk.calculationType = 'LAAD';
                return result;
            case 'Carcinogenic Risk Type':
                result = calculatedLAAD / RfC;
                newRisk.calculationType = 'Carcinogenic Risk';
                return result;
            case 'Non-Carcinogenic Risk Type':
                result = calculatedLAAD * SF;
                newRisk.calculationType = 'Non-Carcinogenic Risk';
                return result;
            default:
                return 0;
        }
    };

    const renderCalculationFields = () => {
        switch (calculationType) {
            case 'Carcinogenic Risk Type':
                return (
                    <>
                        <div className="calculation-field">
                            <label className="calculation-label">Reference Concentration (RfC): </label>
                            <input
                                className="calculation-input"
                                type="number"
                                value={RfC}
                                onChange={(e) => setRfC(Number(e.target.value))}
                            />
                        </div>
                    </>
                );
            case 'Non-Carcinogenic Risk Type':
                return (
                    <>
                        <div className="calculation-field">
                            <label className="calculation-label">Carcinogenic Slope Factor (SF): </label>
                            <input
                                className="calculation-input"
                                type="number"
                                value={SF}
                                onChange={(e) => setSF(Number(e.target.value))}
                            />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <main className="calculation-main">
                <h3 className="calculation-title">Here you can calculate carcinogenic and non-carcinogenic risk</h3>
                <section className="calculation-form">
                    <div className="calculation-field">
                        <label className="calculation-label">Substance name: </label>
                        <input className="calculation-input" type="text" value={newRisk.substanceName}
                               onChange={(e) => handleAddRiskChange('substanceName', e.target.value)} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">Concentration (C, mg/m³): </label>
                        <input className="calculation-input" type="number" value={C}
                               onChange={(e) => setC(Number(e.target.value))} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">Air Intake Rate (CR, m³/day): </label>
                        <input className="calculation-input" type="number" value={CR}
                               onChange={(e) => setCR(Number(e.target.value))} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">Exposure Frequency (EF, days/year): </label>
                        <input className="calculation-input" type="number" value={EF}
                               onChange={(e) => setEF(Number(e.target.value))} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">Exposure Duration (ED, years): </label>
                        <input className="calculation-input" type="number" value={ED}
                               onChange={(e) => setED(Number(e.target.value))} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">Body Weight (BW, kg): </label>
                        <input className="calculation-input" type="number" value={BW}
                               onChange={(e) => setBW(Number(e.target.value))} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">Averaging Time (AT, years): </label>
                        <input className="calculation-input" type="number" value={AT}
                               onChange={(e) => setAT(Number(e.target.value))} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">Calculation type: </label>
                        <select
                            className="select-css"
                            id="big-select"
                            value={calculationType}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="" disabled>Select Calculation Type</option>
                            <option value="LAAD Type">Calculate average dose per day over the entire period of exposure (LADD)</option>
                            <option value="Carcinogenic Risk Type">Calculate Carcinogenic Risk (CR)</option>
                            <option value="Non-Carcinogenic Risk Type">Calculate Non-Carcinogenic Risk (HQ)</option>
                        </select>
                        {renderCalculationFields()}
                    </div>

                    <button className="calculation-button" onClick={handleAddRisk}>Calculate risk</button>
                </section>

                <section className="calculation-form">
                    <EnvironmentalCalculationForm />
                </section>

                <TopButton />
            </main>
            <RiskInfoTable />
        </>
    );
};

const EnvironmentalCalculationForm: React.FC = () => {
    const [calculationType, setCalculationType] = useState<CalculationType>('airEmission');
    const [inputValues, setInputValues] = useState({
        rBi: 0,
        rBnorm: 0,
        qv: 0,
        T: 0,
        qmi: 0,
        qmNorm: 0,
        Kkat: 1,
        KR: 1,
        kz: 1.5,
        m: 0,
        Mi: 0,
        gi: 0,
        g: 766.96,
        I: 0,
        Ai: 1,
        GDKi: 1,
        Sif: 0,
        Sid: 0,
        Qif: 0,
        t: 0
    });
    const [result, setResult] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({ ...prev, [name]: parseFloat(value) }));
    };

    const calculate = () => {
        let resultValue = 0;

        if (calculationType === 'airEmission') {
            resultValue = 3.6e-6 * (inputValues.rBi - inputValues.rBnorm) * inputValues.qv * inputValues.T;
        } else if (calculationType === 'waterDamage') {
            resultValue = inputValues.Kkat * inputValues.KR * inputValues.kz *
                (inputValues.Mi * inputValues.gi);
        } else if (calculationType === 'waterDischarge') {
            resultValue = (inputValues.Sif - inputValues.Sid) * inputValues.Qif * inputValues.t * 1e-6;
        }

        setResult(resultValue);
    };

    return (
        <div>
            <h2 className="calculation-title">Environmental Damage Calculation</h2>
            <section className="calculation-form">
            <div className="calculation-field">
                <label className="calculation-label">Calculation Type:</label>
                <select
                    id="big-select"
                    className="select-css"
                    value={calculationType}
                    onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                >
                    <option value="airEmission">Air Emission</option>
                    <option value="waterDamage">Water Damage</option>
                    <option value="waterDischarge">Water Discharge</option>
                </select>
            </div>

            {calculationType === 'airEmission' && (
                <>
                    <div className="calculation-field">
                        <label className="calculation-label">rBi (mg/m³):</label>
                        <input className="calculation-input" name="rBi" type="number" placeholder="rBi" onChange={handleChange} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">rBnorm (mg/m³):</label>
                        <input className="calculation-input" name="rBnorm" type="number" placeholder="rBnorm" onChange={handleChange} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">qv (m³/s):</label>
                        <input className="calculation-input" name="qv" type="number" placeholder="qv" onChange={handleChange} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">T (hours):</label>
                        <input className="calculation-input" name="T" type="number" placeholder="T" onChange={handleChange} />
                    </div>
                </>
            )}

            {calculationType === 'waterDamage' && (
                <>
                    <div className="calculation-field">
                        <label className="calculation-label">Kkat:</label>
                        <input className="calculation-input" name="Kkat" type="number" placeholder="Kkat" onChange={handleChange} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">KR:</label>
                        <input className="calculation-input" name="KR" type="number" placeholder="KR" onChange={handleChange} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">kz:</label>
                        <input className="calculation-input" name="kz" type="number" placeholder="kz" onChange={handleChange} defaultValue={1.5} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">Mi (tons):</label>
                        <input className="calculation-input" name="Mi" type="number" placeholder="Mi" onChange={handleChange} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">gi (UAH/ton):</label>
                        <input className="calculation-input" name="gi" type="number" placeholder="gi" onChange={handleChange} />
                    </div>
                </>
            )}

            {calculationType === 'waterDischarge' && (
                <>
                    <div className="calculation-field">
                        <label className="calculation-label">Sif (g/m³):</label>
                        <input className="calculation-input" name="Sif" type="number" placeholder="Sif" onChange={handleChange} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">Sid (g/m³):</label>
                        <input className="calculation-input" name="Sid" type="number" placeholder="Sid" onChange={handleChange} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">Qif (m³/h):</label>
                        <input className="calculation-input" name="Qif" type="number" placeholder="Qif" onChange={handleChange} />
                    </div>
                    <div className="calculation-field">
                        <label className="calculation-label">t (hours):</label>
                        <input className="calculation-input" name="t" type="number" placeholder="t" onChange={handleChange} />
                    </div>
                </>
            )}


            <button className="calculation-button" onClick={calculate}>Calculate damage</button>

            {result !== null && (
                <div className="calculation-result">
                    <h3>Result: {result}</h3>
                </div>
            )}
            </section>
        </div>
    );
};

export default CalculationPage;
