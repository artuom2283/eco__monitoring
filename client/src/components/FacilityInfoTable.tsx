import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "../app/store/configureStore";
import React, {useEffect, useState} from "react";
import {
    deleteFacilityAsync,
    updateFacilityAsync,
} from "../features/pollution/pollutionSlice";

export const FacilityInfoTable = () => {
    const dispatch = useDispatch<any>();

    const facilities = useAppSelector(state => state.pollution.facilities);

    console.log(facilities);

    const [editValues, setEditValues] = useState<{ [key: number]: string }>({});

    const handleInputChange = (id: number, value: string) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSave = async(facilityId: number) => {
        const updatedName = editValues[facilityId] || "";
        const facility = facilities.find(f => f.id === facilityId);
        if (!facility) {
            console.log("Facility not found!");
            return;
        }

        facility.name = updatedName;
        try {
            await dispatch(updateFacilityAsync(facility));
            console.log("Facility updated successfully!");
        } catch (error) {
            console.log("Failed to update facility.");
        }
    };

    const handleDelete = async (facilityId: number) => {
        try {
            await dispatch(deleteFacilityAsync(facilityId));
            console.log("Facility deleted successfully!");
        } catch (error) {
            console.log("Failed to delete facility.");
        }
    };

    return (
        <div className="facility-info-table">
            <h2>Industrial Facility Information Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Facility ID</th>
                    <th>Facility Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {facilities?.map(facility => (
                    <tr key={facility.id}>
                        <td>{facility.id}</td>
                        <td><input
                            type="text"
                            value={editValues[facility.id] ?? facility.name}
                            onChange={(e) => handleInputChange(facility.id, e.target.value)}
                        /></td>
                        <td>
                            <button
                                onClick={() => handleSave(facility.id)}
                            >
                                Save
                            </button>
                            <button onClick={() => handleDelete(facility.id)}>
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
