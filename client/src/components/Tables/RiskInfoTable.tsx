import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/store/configureStore";
import React, {useState} from "react";
import {deleteRiskAsync, fetchRisksAsync} from "../../features/pollution/pollutionSlice";
import {SuccessNotification} from "../SuccessNotification";
import {RiskDto} from "../../app/models/Risk";

export const RiskInfoTable = () => {
    const dispatch = useDispatch<any>();

    const risks = useAppSelector((state: any) => state.pollution.risks);

    console.log(risks);

    const [editFacilityNames, setEditFacilityNames] = useState<{ [key: number]: string }>({});

    const handleInputChange = (id: number, value: string) => {
        setEditFacilityNames((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleDelete = async (riskId: number) => {
        try {
            await dispatch(deleteRiskAsync(riskId)).unwrap();
            SuccessNotification();
            console.log("Risk deleted successfully!");
            await dispatch(fetchRisksAsync());
        } catch (error) {
            console.log("Failed to delete risk.");
        }
    };

    return (
        <div className="risk-info-table">
            <h2>Risks Information Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Substance Name</th>
                    <th>Calculation Type</th>
                    <th>Result</th>
                    <th className="actions-column">Actions</th>
                </tr>
                </thead>
                <tbody>
                {risks?.map((risk: RiskDto) => (
                    <tr className="risk-info-table__inside" key={risk.id}>
                        <td className="risk-info-table__input">
                            <input
                                type="text"
                                value={risk.substanceName}/>
                        </td>
                        <td className="risk-info-table__input">
                            <input
                                type="text"
                                value={risk.calculationType}/>
                        </td>
                        <td className="risk-info-table__input">
                            <input
                                type="text"
                                value={risk.result}/>
                        </td>
                        <td className="actions-column">
                            <button onClick={() => handleDelete(risk.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}