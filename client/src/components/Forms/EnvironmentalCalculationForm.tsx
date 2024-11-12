import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {
    addDamageAsync,
    fetchDamagesAsync,
} from "../../features/pollution/pollutionSlice";
import {SuccessNotification} from "../SuccessNotification";

export const EnvironmentalCalculationForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const damagesLoaded = useAppSelector(state => state.pollution.damagesLoaded);

    useEffect(() => {
        const loadData = async () => {
            if (!damagesLoaded) await dispatch(fetchDamagesAsync());
        };

        loadData();
    }, [damagesLoaded, dispatch]);

    const [damageType, setType] = useState<string>('');

    const [newDamage, setNewDamage] = React.useState({
        id: 0,
        type: '',
        result: 0,
    });

    const [inputValues, setInputValues] = useState({
        rBi: 0,
        rBnorm: 0,
        qv: 0,
        T: 0,
        qmi: 0,
        qmNorm: 0,
        Kkat: 1,
        KR: 1,
        kz: 0,
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

    const handleAddDamage = async () => {
        try {
            const result = calculate(damageType);
            const updatedDamage = { ...newDamage, result, type: damageType };
            await dispatch(addDamageAsync(updatedDamage)).unwrap();
            SuccessNotification();
            console.log("New damage added successfully!");
            setNewDamage({
                id: 0,
                type: '',
                result: 0,
            });
            await dispatch(fetchDamagesAsync());
        } catch (error) {
            console.error("Error adding damage:", error);
        }
    };

    const handleChange = (name: string, value: number) => {
        setInputValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const calculate = useCallback((type: string) => {
        let resultValue;
        switch (type) {
            case 'airEmission':
                resultValue = 3.6e-6 * (inputValues.rBi - inputValues.rBnorm) * inputValues.qv * inputValues.T;
                return resultValue;

            case 'waterDamage':
                resultValue = inputValues.Kkat * inputValues.KR * inputValues.kz *
                    (inputValues.Mi * inputValues.gi);
                return resultValue;

            case 'waterDischarge':
                resultValue = (inputValues.Sif - inputValues.Sid) * inputValues.Qif * inputValues.t * 1e-6;
                return resultValue;
            default:
                return 0;
        }
    }, [inputValues]);

    return (
        <div>
            <h2 className="calculation-title">Environmental Damage Calculation</h2>
            <section className="calculation-form">
                <div className="calculation-field">
                    <label className="calculation-label">Calculation Type:</label>
                    <select
                        id="big-select"
                        className="select-css"
                        value={damageType}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="" disabled>Select Calculation Type</option>
                        <option value="airEmission">Air Emission</option>
                        <option value="waterDamage">Water Damage</option>
                        <option value="waterDischarge">Water Discharge</option>
                    </select>
                </div>

                {damageType === 'airEmission' && (
                    <>
                        <div className="calculation-field">
                            <label className="calculation-label">rBi (mg/m³):</label>
                            <input className="calculation-input" name="rBi" type="number" placeholder="rBi" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">rBnorm (mg/m³):</label>
                            <input className="calculation-input" name="rBnorm" type="number" placeholder="rBnorm" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">qv (m³/s):</label>
                            <input className="calculation-input" name="qv" type="number" placeholder="qv" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">T (hours):</label>
                            <input className="calculation-input" name="T" type="number" placeholder="T" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                    </>
                )}

                {damageType === 'waterDamage' && (
                    <>
                        <div className="calculation-field">
                            <label className="calculation-label">Kkat:</label>
                            <input className="calculation-input" name="Kkat" type="number" placeholder="Kkat" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">KR:</label>
                            <input className="calculation-input" name="KR" type="number" placeholder="KR" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">kz:</label>
                            <input className="calculation-input" name="kz" type="number" placeholder="kz" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">Mi (tons):</label>
                            <input className="calculation-input" name="Mi" type="number" placeholder="Mi" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">gi (UAH/ton):</label>
                            <input className="calculation-input" name="gi" type="number" placeholder="gi" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                    </>
                )}

                {damageType === 'waterDischarge' && (
                    <>
                        <div className="calculation-field">
                            <label className="calculation-label">Sif (g/m³):</label>
                            <input className="calculation-input" name="Sif" type="number" placeholder="Sif" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">Sid (g/m³):</label>
                            <input className="calculation-input" name="Sid" type="number" placeholder="Sid" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">Qif (m³/h):</label>
                            <input className="calculation-input" name="Qif" type="number" placeholder="Qif" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">t (hours):</label>
                            <input className="calculation-input" name="t" type="number" placeholder="t" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                    </>
                )}

                <button className="calculation-button" onClick={handleAddDamage}>Calculate damage</button>
            </section>
        </div>
    );
}