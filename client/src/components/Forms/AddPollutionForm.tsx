import React from "react";
import {PollutionDto} from "../../app/models/Pollution";
import {addPollutionAsync, fetchPollutionsAsync} from "../../features/pollution/pollutionSlice";
import {useAppDispatch} from "../../app/store/configureStore";

export const AddPollutionForm = () => {
    const dispatch = useAppDispatch();

    const [newPollution, setNewPollution] = React.useState({
        id: 0,
        name: '',
        massFlowRate: 0,
        emissionsLimit: 0,
        dangerClass: 0
    });

    const handleAddPollutionChange = (field: keyof PollutionDto, value: any) => {
        setNewPollution(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddPollution = async () => {
        try {
            console.log("Adding new pollution:", newPollution);
            await dispatch(addPollutionAsync(newPollution));
            console.log("New pollution added successfully!");
            setNewPollution({
                id: 0,
                name: '',
                massFlowRate: 0,
                emissionsLimit: 0,
                dangerClass: 0
            });
            await dispatch(fetchPollutionsAsync());
        } catch (error) {
            console.error("Error adding pollution:", error);
        }
    };

    return (
        <div className="add-form">
            <h2>Add New Pollution</h2>
            <label htmlFor="pollution-name">Pollution Name:</label>
            <input
                id={"pollution-name"}
                type="text"
                placeholder="Pollution Name"
                value={newPollution.name}
                onChange={(e) => handleAddPollutionChange('name', e.target.value)}
            />
            <label htmlFor="pollution-dangerClass">Danger Class:</label>
            <input
                id={"pollution-dangerClass"}
                type="number"
                placeholder="Danger Class"
                value={newPollution.dangerClass}
                onChange={(e) => handleAddPollutionChange('dangerClass', parseFloat(e.target.value))}
            />
            <label htmlFor="pollution-massFlowRate">Mass Flow Rate:</label>
            <input
                id={"pollution-massFlowRate"}
                type="number"
                placeholder="Mass Flow Rate"
                value={newPollution.massFlowRate}
                onChange={(e) => handleAddPollutionChange('massFlowRate', parseFloat(e.target.value))}
            />
            <label htmlFor="pollution-emissionsLimit">Emissions Limit:</label>
            <input
                id={"pollution-emissionsLimit"}
                type="number"
                placeholder="Emissions Limit"
                value={newPollution.emissionsLimit}
                onChange={(e) => handleAddPollutionChange('emissionsLimit', parseFloat(e.target.value))}
            />
            <button onClick={handleAddPollution}>Add Pollution</button>
        </div>
    )
}