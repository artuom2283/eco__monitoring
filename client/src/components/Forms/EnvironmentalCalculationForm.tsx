import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {
    addDamageAsync,
    fetchDamagesAsync, fetchFacilitiesAsync, fetchPollutionsAsync,
} from "../../features/pollution/pollutionSlice";
import {SuccessNotification} from "../SuccessNotification";
import {IndustrialFacilityDto} from "../../app/models/Facility";
import {PollutionDto} from "../../app/models/Pollution";
import {DamageDto} from "../../app/models/Damage";

export const EnvironmentalCalculationForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const pollutions = useAppSelector(state => state.pollution.pollutions);
    const facilities = useAppSelector((state: any) => state.pollution.facilities);
    const damagesLoaded = useAppSelector(state => state.pollution.damagesLoaded);
    const facilitiesLoaded = useAppSelector(state => state.pollution.facilitiesLoaded);
    const pollutionsLoaded = useAppSelector(state => state.pollution.pollutionsLoaded);

    useEffect(() => {
        const loadData = async () => {
            if (!damagesLoaded) await dispatch(fetchDamagesAsync());
            if (!pollutionsLoaded) await dispatch(fetchPollutionsAsync());
            if (!facilitiesLoaded) await dispatch(fetchFacilitiesAsync());
        };

        loadData();
    }, [damagesLoaded, pollutionsLoaded, facilitiesLoaded, dispatch]);

    const [damageType, setType] = useState<string>('');

    const [newDamage, setNewDamage] = React.useState({
        id: 0,
        type: '',
        result: 0,
        pollutionId: 0,
        industrialFacilityId: 0,
        year: 0
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
                pollutionId: 0,
                industrialFacilityId: 0,
                year: 0
            });
            await dispatch(fetchDamagesAsync());
        } catch (error) {
            console.error("Error adding damage:", error);
        }
    };

    const handleDamageChange = (field: keyof DamageDto | string, value: any) => {
        setNewDamage(prev => ({
            ...prev,
            [field]: value
        }));
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
                    <label htmlFor="facility-id">Facility Name:</label>
                    <select
                        className="select-css"
                        id="facility-id"
                        value={newDamage.industrialFacilityId}
                        onChange={(e) => handleDamageChange('industrialFacilityId', parseInt(e.target.value))}
                    >
                        <option value={0} disabled>Select Facility</option>
                        {facilities.map((facility: IndustrialFacilityDto) => (
                            <option key={facility.id} value={facility.id}>
                                {facility.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="pollution-id">Pollution Name:</label>
                    <select
                        className="select-css"
                        id="pollution-id"
                        value={newDamage.pollutionId}
                        onChange={(e) => handleDamageChange('pollutionId', parseInt(e.target.value))}
                    >
                        <option value={0} disabled>Select Pollution</option>
                        {pollutions.map((pollution: PollutionDto) => (
                            <option key={pollution.id} value={pollution.id}>
                                {pollution.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="report-year">Year:</label>
                    <input className="calculation-input"
                        id={"report-year"}
                        type="number"
                        placeholder="Report Year"
                        value={newDamage.year}
                        onChange={(e) => handleDamageChange('year', parseFloat(e.target.value))}
                    />

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
                            <input className="calculation-input" name="rBi" type="number" placeholder="rBi"
                                   onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}/>
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">rBnorm (mg/m³):</label>
                            <input className="calculation-input" name="rBnorm" type="number" placeholder="rBnorm"
                                   onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}/>
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">qv (m³/s):</label>
                            <input className="calculation-input" name="qv" type="number" placeholder="qv"
                                   onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}/>
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