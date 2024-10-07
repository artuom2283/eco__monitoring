import React, {useState} from "react";
import {IndustrialFacilityDto} from "../../app/models/Facility";
import {addFacilityAsync, fetchFacilitiesAsync} from "../../features/pollution/pollutionSlice";
import {useAppDispatch} from "../../app/store/configureStore";


export const AddFacilityForm = ({}) => {
    const dispatch = useAppDispatch();

    const [newFacility, setNewFacility] = useState({
        id: 0,
        name: '',
    });

    const handleAddFacilityChange = (field: keyof IndustrialFacilityDto, value: any) => {
        setNewFacility(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddFacility = async () => {
        try {
            console.log("Adding new facility:", newFacility);
            await dispatch(addFacilityAsync(newFacility));
            console.log("New pollution added successfully!");
            setNewFacility({
                id: 0,
                name: ''
            });
            await dispatch(fetchFacilitiesAsync());
        } catch (error) {
            console.error("Error adding pollution:", error);
        }
    };

    return (
        <div className="add-form">
            <h2>Add New Industrial Facility</h2>
            <label htmlFor="facility-name">Facility Name:</label>
            <input
                id={"facility-name"}
                type="text"
                placeholder="Facility Name"
                value={newFacility.name}
                onChange={(e) => handleAddFacilityChange('name', e.target.value)}
            />
            <button onClick={handleAddFacility}>Add Facility</button>
        </div>
    )
}