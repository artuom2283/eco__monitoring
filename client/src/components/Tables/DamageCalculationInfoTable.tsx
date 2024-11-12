import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/store/configureStore";
import {
    deleteDamageAsync,
    fetchDamagesAsync,
} from "../../features/pollution/pollutionSlice";
import {SuccessNotification} from "../SuccessNotification";
import React from "react";
import {DamageDto} from "../../app/models/Damage";

export const DamageCalculationInfoTable = () => {
    const dispatch = useDispatch<any>();
    const damages = useAppSelector((state: any) => state.pollution.damages);

    const handleDelete = async (damageId: number) => {
        try {
            await dispatch(deleteDamageAsync(damageId)).unwrap();
            SuccessNotification();
            await dispatch(fetchDamagesAsync());
        } catch (error) {
            console.log("Failed to delete deamage.");
        }
    };

    return (
        <div className="risk-info-table">
            <h2>Damage Information Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Calculation Type</th>
                    <th>Result (UAN/ton)</th>
                    <th className="actions-column">Actions</th>
                </tr>
                </thead>
                <tbody>
                {damages?.map((damage: DamageDto) => (
                    <tr className="risk-info-table__inside" key={damage.id}>
                        <td className="risk-info-table__cell-first">
                            <div>{damage.id}</div>
                        </td>
                        <td className="risk-info-table__cell-second">
                            <div>{damage.type === 'airEmission' ? 'Air Emission' :
                                damage.type === 'waterDamage' ? 'Water Damage' :
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