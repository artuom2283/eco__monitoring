import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/store/configureStore";
import React, {useState} from "react";
import {
    deleteFacilityAsync, fetchFacilitiesAsync, fetchReportsAsync,
    updateFacilityAsync,
} from "../../features/pollution/pollutionSlice";
import {IndustrialFacilityDto} from "../../app/models/Facility";
import {SuccessNotification} from "../SuccessNotification";

export const FacilityInfoTable = () => {
    const dispatch = useDispatch<any>();

    const facilities = useAppSelector((state: any) => state.pollution.facilities);

    console.log(facilities);

    const [editFacilityNames, setEditFacilityNames] = useState<{ [key: number]: string }>({});

    const handleInputChange = (id: number, value: string) => {
        setEditFacilityNames((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSave = async (facilityId: number) => {
        const facility = facilities.find((f: IndustrialFacilityDto) => f.id === facilityId);
        if (!facility) {
            console.log("Facility not found!");
            return;
        }

        try {
            const updatedFacility = {
                ...facility,
                name: editFacilityNames[facilityId] || facility.name,
            };

            await dispatch(updateFacilityAsync(updatedFacility)).unwrap();
            SuccessNotification();
            console.log("Facility updated successfully!");
            await dispatch(fetchFacilitiesAsync());
            await dispatch(fetchReportsAsync());
        } catch (error) {
            console.log("Failed to update facility.");
        }
    };

    const handleDelete = async (facilityId: number) => {
        try {
            await dispatch(deleteFacilityAsync(facilityId)).unwrap();
            SuccessNotification();
            console.log("Facility deleted successfully!");
            await dispatch(fetchFacilitiesAsync());
            await dispatch(fetchReportsAsync());
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
                    <th>Facility Name</th>
                    <th className="actions-column">Actions</th>
                </tr>
                </thead>
                <tbody>
                {facilities?.map((facility: IndustrialFacilityDto) => (
                    <tr className="facility-info-table__inside" key={facility.id}>
                        <td className="facility-info-table__input">
                            <input
                                type="text"
                                value={editFacilityNames[facility.id] || facility.name}
                                onChange={(e) => handleInputChange(facility.id, e.target.value)}/>
                        </td>
                        <td className="actions-column">
                            <button onClick={() => handleSave(facility.id)}>
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
