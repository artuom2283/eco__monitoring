import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/store/configureStore";
import React, {useState} from "react";
import {
    deletePollutionAsync, fetchPollutionsAsync, fetchReportsAsync,
    updatePollutionAsync,
} from "../../features/pollution/pollutionSlice";
import {PollutionDto} from "../../app/models/Pollution";
import {SuccessNotification} from "../SuccessNotification";

export const PollutionInfoTable = () => {
    const dispatch = useDispatch<any>();

    const pollutions = useAppSelector(state => state.pollution.pollutions);

    console.log(pollutions);

    const [editPollution, setEditPollution] = useState<{ [key: number]: PollutionDto }>({});

    const handleInputChange = (id: number, field: keyof PollutionDto, value: any) => {
        setEditPollution((prevValues) => ({
            ...prevValues,
            [id]: {
                ...prevValues[id],
                [field]: value,
            },
        }));
    };

    const handleSave = async(pollutionId: number) => {
        const pollution = pollutions.find((p:PollutionDto) => p.id === pollutionId);
        if (!pollution) {
            console.log("Pollution not found!");
            return;
        }

        try {
            const updatedPollution = {
                ...pollution,
                ...editPollution[pollutionId],
            };

            await dispatch(updatePollutionAsync(updatedPollution)).unwrap();
            SuccessNotification();
            console.log("Pollution updated successfully!");
            await dispatch(fetchPollutionsAsync());
            await dispatch(fetchReportsAsync());
        } catch (error) {
            console.log("Failed to update pollution.");
        }
    };

    const handleDelete = async (pollutionId: number) => {
        try {
            await dispatch(deletePollutionAsync(pollutionId)).unwrap();
            SuccessNotification();
            console.log("Pollution deleted successfully!");
            await dispatch(fetchPollutionsAsync());
            await dispatch(fetchReportsAsync());
        } catch (error) {
            console.log("Failed to delete pollution.");
        }
    };

    return (
        <div className="pollution-info-table">
            <h2>Pollution Information Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Pollution Name</th>
                    <th>Mass Flow Rate, gram/hour</th>
                    <th>Emissions Limit, mg/m^3</th>
                    <th>Danger Class</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {pollutions?.map((pollution: PollutionDto) => (
                    <tr key={pollution.id}>
                        <td><input
                            type="text"
                            value={editPollution[pollution.id]?.name ?? pollution.name}
                            onChange={(e) => handleInputChange(pollution.id, 'name', e.target.value)}
                        /></td>
                        <td><input
                            type="text"
                            value={editPollution[pollution.id]?.massFlowRate ?? pollution.massFlowRate}
                            onChange={(e) => handleInputChange(pollution.id, 'massFlowRate', e.target.value)}
                        /></td>
                        <td><input
                            type="text"
                            value={editPollution[pollution.id]?.emissionsLimit ?? pollution.emissionsLimit}
                            onChange={(e) => handleInputChange(pollution.id, 'emissionsLimit', e.target.value)}
                        /></td>
                        <td><input
                            type="text"
                            value={editPollution[pollution.id]?.dangerClass ?? pollution.dangerClass}
                            onChange={(e) => handleInputChange(pollution.id, 'dangerClass', e.target.value)}
                        /></td>
                        <td>
                            <button
                                onClick={() => handleSave(pollution.id)}
                            >
                                Save
                            </button>
                            <button onClick={() => handleDelete(pollution.id)}>
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
