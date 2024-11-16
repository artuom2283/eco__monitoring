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

export const EmergencySituationsDamage: React.FC = () => {

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
        Msi: 0,
        Kv: 0,
        Kmp: 0,
        Fv: 0,
        Ez: 0,
        t: 0,
        kv: 0,
        kvo: 0,
        c: 0,
        S: 0,
        Goz: 0,
        K: 0,
        Ks: 0
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

    const selectedPollution = pollutions.find((pollution: PollutionDto) => pollution.id === newDamage.pollutionId);

    const calculate = useCallback((type: string) => {
        let resultValue;
        switch (type) {
            case 'airEmissions':
                let tax_rate = 0;
                if(selectedPollution.name == 'Оксид азоту' || selectedPollution.name == 'Сірки діоксид' || selectedPollution.name == 'Оксид вуглецю'){
                    tax_rate = 145.50;
                }
                else if(selectedPollution.name == 'Речовини у вигляді суспендованих твердих частинок'){
                    tax_rate = 628.32;
                }
                console.log(inputValues.Msi + " " + tax_rate + " " + selectedPollution.hazardClassCoefficient + " " + inputValues.Kv + " " + inputValues.Kmp);
                resultValue = inputValues.Msi * tax_rate * selectedPollution.hazardClassCoefficient * inputValues.Kv * inputValues.Kmp * 10;
                return resultValue;

            case 'waterEmissions':
                let kv = 10;
                let kr = 1.28;
                let kz = 1.5;
                let Mi = inputValues.Fv * inputValues.t * inputValues.c * 1e-6;
                resultValue = kv * kr * kz * Mi * inputValues.kvo;
                return resultValue;

            case 'landEmissions':
                let A = 1.5;
                console.log(A + " " + inputValues.Goz + " " + inputValues.S + " " + selectedPollution.hazardCoefficient + " " + calculateVr(inputValues.S, inputValues.Ks) + " " + inputValues.K);
                const Vr = calculateVr(inputValues.S, inputValues.Ks);
                resultValue = A * inputValues.Goz * inputValues.S * selectedPollution.hazardCoefficient * Vr * inputValues.K;
                return resultValue;
            default:
                return 0;
        }
    }, [inputValues]);

    const calculateVr = (S: number, pollutedZoneRatio: number) => {
        const complexityCoeff = 1;

        const ranges = [5, 10, 20, 50, 100];
        const baseCosts = [25000, 30000, 35000, 40000, 45000, 50000];
        const perAreaCost = 4000;

        let P1 = baseCosts[baseCosts.length - 1];
        for (let i = 0; i < ranges.length; i++) {
            if (S <= ranges[i]) {
                P1 = baseCosts[i];
                break;
            }
        }

        const soilWorkCoefficient = (P1 + perAreaCost * S);
        return complexityCoeff * pollutedZoneRatio * soilWorkCoefficient;
    };

    return (
        <div>
            <h2 className="calculation-title">Damages During Emergency Situations</h2>
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
                    <label className="calculation-label">
                        Type of damage caused:</label>
                    <select
                        id="big-select"
                        className="select-css"
                        value={damageType}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="" disabled>Select</option>
                        <option value="airEmissions">
                            Розмір шкоди за викиди в атмосферне повітря</option>
                        <option value="waterEmissions">Розмір шкоди за викиди у водні ресурси</option>
                        <option value="landEmissions">Розмір шкоди за викиди в земельні ресурси</option>
                    </select>
                </div>

                {damageType === 'airEmissions' && (
                    <>
                        <div className="calculation-field">
                            <label className="calculation-label">Мсі - маса згорілої речовини, т:</label>
                            <input className="calculation-input" name="Msi" type="number" placeholder="Msi"
                                   onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}/>
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">Кв - коефіцієнт впливу, год:</label>
                            <select
                                id="big-select"
                                className="select-css"
                                name={"Kv"}
                                value={inputValues.Kv}
                                onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}
                            >
                                <option value="" disabled>Select</option>
                                <option value="3">
                                    у разі не визначення тривалості подій
                                </option>
                                <option value="4">до 12 годин</option>
                                <option value="5">від 12 до 24 годин</option>
                                <option value="6">більше 24 годин
                                </option>
                            </select>
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">Кмп - коефіцієнт масштабу подій, тон або Га:</label>
                            <select
                                id="big-select"
                                className="select-css"
                                name={"Kmp"}
                                value={inputValues.Kmp}
                                onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}
                            >
                                <option value="" disabled>Select</option>
                                <option value="1.2">
                                    у разі не визначення або до 50
                                </option>
                                <option value="2">від 50 до 150</option>
                                <option value="3">від 150 до 500</option>
                                <option value="4">від 500 до 1000</option>
                                <option value="5">від 1000</option>
                            </select>
                        </div>
                    </>
                )}

                {damageType === 'waterEmissions' && (
                    <>
                        <div className="calculation-field">
                            <label className="calculation-label">Фактичні витрати зворотних вод, м^3/год:</label>
                            <input className="calculation-input" name="Fv" type="number" placeholder="Fv"
                                   onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}/>
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">Проіндексований питомий економ. збиток від забрудення
                                вод ресурсів у поточному році, грн/т:</label>
                            <input className="calculation-input" name="Ez" type="number" placeholder="Ez"
                                   onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}/>
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">Категорія водного об'єкта:</label>
                            <select
                                id="big-select"
                                name={"kvo"}
                                className="select-css"
                                value={inputValues.kvo}
                                onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}
                            >
                                <option value="" disabled>Select</option>
                                <option value="1.5">
                                    Поверхневі водні об’єкти
                                </option>
                                <option value="3.5">Внутрішні морські води, територіальне море, а також акваторії морських портів</option>
                                <option value="4.5">Водні об’єкти в межах територій природно-заповідного фонду</option>
                                <option value="5">Підземні води</option>
                            </select>
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">Час роботи джерела викиду забруд. речовини в режимі
                                надмірного викиду, год:</label>
                            <input className="calculation-input" name="t" type="number" placeholder="t"
                                   onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}/>
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">Концентрація сполуки, мг/м^3:</label>
                            <input className="calculation-input" name="c" type="number" placeholder="c"
                                   onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}/>
                        </div>
                    </>
                )}

                {damageType === 'landEmissions' && (
                    <>
                        <div className="calculation-field">
                            <label className="calculation-label">S - площа земельних ділянок, грунти яких забруденені,
                                га:</label>
                            <input className="calculation-input" name="S" type="number" placeholder="S"
                                   onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">Гоз - нормативна грошова оцінка земельної ділянки, яка зазнала забруднення, грн/кв.м:</label>
                            <input className="calculation-input" name="Goz" type="number" placeholder="Goz" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">К - коефіцієнт кількості забруднених ділянок:</label>
                            <select
                                id="big-select"
                                className="select-css"
                                name={"K"}
                                value={inputValues.K}
                                onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}
                            >
                                <option value="" disabled>Select</option>
                                <option value="1">
                                    кількість ділянок - 1
                                </option>
                                <option value="1.1">кількість ділянок - 2</option>
                                <option value="1.2">кількість ділянок - 3</option>
                                <option value="1.9">кількість ділянок - 4 і більше</option>
                            </select>
                        </div>
                        <div className="calculation-field">
                            <label className="calculation-label">К(с) - коефіцієнт складності:</label>
                            <select
                                id="big-select"
                                className="select-css"
                                name={"Ks"}
                                value={inputValues.Ks}
                                onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value) || 0)}
                            >
                                <option value="" disabled>Select</option>
                                <option value="1">
                                    при рівній місцевості
                                </option>
                                <option value="1.2">в інших випадках</option>
                            </select>
                        </div>
                    </>
                )}

                <button className="calculation-button" onClick={handleAddDamage}>Calculate</button>
            </section>
        </div>
    );
}