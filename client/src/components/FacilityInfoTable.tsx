import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "../app/store/configureStore";
import React, {useEffect, useState} from "react";
import {
    deleteFacilityAsync,
    fetchFacilitiesAsync,
    updatePollutionAsync
} from "../features/pollution/pollutionSlice";
import {IndustrialFacilityDto} from "../app/models/Facility";

export const FacilityInfoTable = () => {
    const dispatch = useDispatch<any>();

    const facilitiesLoaded = useAppSelector(state => state.pollution.facilitiesLoaded);
    const facilities: IndustrialFacilityDto[] = useAppSelector(state => state.facilities);

    const [editValues, setEditValues] = useState<{ [key: number]: string }>({});

    const handleInputChange = (id: number, value: string) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    useEffect(() => {
        const fetchFacilities = async () => {
            await dispatch(fetchFacilitiesAsync());
        };

        if (!facilitiesLoaded) {
            fetchFacilities();
        }
    }, []);

    const handleSave = (facilityId: number) => {
        const updatedName = editValues[facilityId] || "";
        await dispatch(updateFacility(facilityId, updatedName));
    };

    const handleDelete = async (facilityId: number) => {
        try {
            await dispatch(deleteFacilityAsync(facilityId));
            console.log("Record deleted successfully!");
        } catch (error) {
            console.log("Failed to delete record.");
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
                {facilities.map(facility => (
                    <tr key={facility.id}>
                        <td><input
                            type="text"
                            value={editValues[facility.id] ?? facility.id}
                            onChange={(e) => handleInputChange(facility.id, e.target.value)}
                        />
                        </td>
                        <td><input
                            type="text"
                            value={editValues[facility.id] ?? facility.name}
                            onChange={(e) => handleInputChange(facility.name, e.target.value)}
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
