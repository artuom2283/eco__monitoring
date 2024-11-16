import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/store/configureStore";
import {
    deleteDamageAsync,
    fetchDamagesAsync,
} from "../../features/pollution/pollutionSlice";
import {SuccessNotification} from "../SuccessNotification";
import React from "react";
import {DamageDto} from "../../app/models/Damage";
import {IndustrialFacilityDto} from "../../app/models/Facility";
import {PollutionDto} from "../../app/models/Pollution";

export const DamageCalculationInfoTable = () => {
    const dispatch = useDispatch<any>();
    const damages = useAppSelector((state: any) => state.pollution.damages);

    const pollutions = useAppSelector(state => state.pollution.pollutions);
    const facilities = useAppSelector((state: any) => state.pollution.facilities);

    const getFacilityName = (facilityId: number) => {
        const facility = facilities.find((f: IndustrialFacilityDto) => f.id === facilityId);
        return facility ? facility.name : "Unknown Facility";
    };

    const getPollutionName = (pollutionId: number) => {
        const pollution = pollutions.find((p: PollutionDto) => p.id === pollutionId);
        return pollution ? pollution.name : "Unknown Pollution";
    };

    const handleDelete = async (damageId: number) => {
        try {
            await dispatch(deleteDamageAsync(damageId)).unwrap();
            SuccessNotification();
            await dispatch(fetchDamagesAsync());
        } catch (error) {
            console.log("Failed to delete damage.");
        }
    };

    return (
        <div className="risk-info-table">
            <h2>Damage Information Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Facility</th>
                    <th>Pollution</th>
                    <th>Year</th>
                    <th>Calculation Type</th>
                    <th>Result (UAN/ton)</th>
                    <th className="actions-column">Actions</th>
                </tr>
                </thead>
                <tbody>
                {damages?.map((damage: DamageDto) => (
                    <tr className="risk-info-table__inside" key={damage.id}>
                        <td className="risk-info-table__cell-first">
                            <div>{getFacilityName(damage.industrialFacilityId)}</div>
                        </td>
                        <td className="risk-info-table__cell-first">
                            <div>{getPollutionName(damage.pollutionId)}</div>
                        </td>
                        <td className="risk-info-table__cell-first">
                            <div>{damage.year}</div>
                        </td>
                        <td className="risk-info-table__cell-second">
                            <div>{damage.type === 'airEmission' ? 'Air Emission' :
                                damage.type === 'waterDamage' ? 'Water Damage' :
                                damage.type === 'waterDischarge' ? 'Water Discharge' :
                                    damage.type === 'airEmissions' ? 'Шкода для атмосферного повітря' :
                                damage.type === 'waterEmissions' ? 'Розмір шкоди для водних ресурсів' :
                                damage.type === 'landEmissions' ? 'Розмір шкоди для земельних ресурсів' :
                                    'Water Discharge'}</div>
                        </td>
                        <td className="risk-info-table__cell-third">
                            <div>{damage.result}</div>
                        </td>
                        <td className="actions-column">
                            <button className="delete" onClick={() => handleDelete(damage.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};