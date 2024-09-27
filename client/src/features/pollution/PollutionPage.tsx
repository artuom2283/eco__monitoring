import React, { useEffect, useState } from 'react';
import './pollution.css';
import '../../App.css'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchPollutionsAsync, fetchFacilitiesAsync, fetchFacilitiesWithPollutionAsync, updatePollutionAsync, deletePollutionAsync } from './pollutionSlice';
import { FullIndustrialFacilityDto } from '../../app/models/Facility';
import { PollutionDto } from '../../app/models/Pollution';

const PollutionPage: React.FC = () => {
    interface FullFacilityWithPollution extends FullIndustrialFacilityDto {
        pollution: PollutionDto | null;
    }

    const dispatch = useAppDispatch();
    const pollutions = useAppSelector(state => state.pollution.pollutions);
    const facilities = useAppSelector(state => state.pollution.facilities);
    const fullFacilities = useAppSelector(state => state.pollution.fullFacilities);

    const pollutionsLoaded = useAppSelector(state => state.pollution.pollutionsLoaded);
    const facilitiesLoaded = useAppSelector(state => state.pollution.facilitiesLoaded);
    const pollutionsWithFacilitiesLoaded = useAppSelector(state => state.pollution.pollutionsWithFacilitiesLoaded);
    const [editedData, setEditedData] = useState<{ [key: string]: PollutionDto }>({});

    useEffect(() => {
        if (!pollutionsLoaded) {
            dispatch(fetchPollutionsAsync());
        }
        if (!facilitiesLoaded) {
            dispatch(fetchFacilitiesAsync());
        }
        if (!pollutionsWithFacilitiesLoaded) {
            dispatch(fetchFacilitiesWithPollutionAsync());
        }
    }, [pollutionsLoaded, facilitiesLoaded, pollutionsWithFacilitiesLoaded, dispatch]);

    const handleSave = async (pollutionId: number, pollutionName: string) => {
        const facilityKey = `${pollutionId}-${pollutionName}`;

        // Find the existing facility data from combinedData
        const existingFacility = combinedData.find(
            facility => facility.pollutionId === pollutionId && facility.pollutionName === pollutionName
        );

        const editedPollution = editedData[facilityKey];

        if (editedPollution && existingFacility && existingFacility.pollution) {
            const updatedPollution = {
                ...existingFacility.pollution, // existing pollution data
                ...editedPollution // updated fields from the editedData
            };

            try {
                console.log("Saving pollution data:", updatedPollution);

                // Dispatch the updatePollutionAsync action with the updated pollution data
                await dispatch(updatePollutionAsync(updatedPollution));

                // Clear the editedData for this specific facility after saving
                setEditedData(prev => {
                    const newData = { ...prev };
                    delete newData[facilityKey];
                    return newData;
                });

                alert("Changes saved successfully!");
                window.location.reload()
            } catch (error) {
                console.error("Save error:", error);
                alert("Failed to save changes.");
            }
        } else {
            alert("No changes to save.");
        }
    };

    const handleDelete = async (facilityId: number) => {
        const pollutionToDelete = combinedData.find(facility => facility.id === facilityId)?.pollution;

        if (pollutionToDelete) {
            try {
                dispatch(deletePollutionAsync(facilityId))
                alert("Record deleted successfully!");
            } catch (error) {
                alert("Failed to delete record.");
            }
        }
    };

    const combinedData: FullFacilityWithPollution[] = fullFacilities.map((facility: any) => ({
        ...facility,
        pollution: pollutions.find((p: any) => p.id === facility.pollutionId) || null,
    }));

    // Group data by year
    const [combinedDataByYear, setCombinedDataByYear] = useState<{ [key: string]: FullFacilityWithPollution[] }>(() => {
        const dataByYear: { [key: string]: FullFacilityWithPollution[] } = {};
        combinedData.forEach((facility) => {
            const year = facility.pollution?.year || 'no data xD';
            if (!dataByYear[year]) {
                dataByYear[year] = [];
            }
            dataByYear[year].push(facility);
        });
        return dataByYear;
    });

    const sortedYears = Object.keys(combinedDataByYear).sort((a, b) =>
        b.localeCompare(a, undefined, { numeric: true })
    );

    // Function to handle input changes
    const handleInputChange = (pollutionId: number, pollutionName: string, fieldName: keyof FullIndustrialFacilityDto, value: any) => {
        setEditedData(prev => {
            const facilityKey = `${pollutionId}-${pollutionName}`;

            // Find the facility based on pollutionId and pollutionName
            const updatedFacility = combinedData.find(
                facility => facility.pollutionId === pollutionId && facility.pollutionName === pollutionName
            );

            if (!updatedFacility) return prev; // If no facility found, return the current state

            const updatedPollution = {
                ...prev[facilityKey],
                [fieldName]: value // Update only the specified field
            };

            return {
                ...prev,
                [facilityKey]: updatedPollution // Update the state for that specific facility
            };
        });
    };

    return (
        <div>
            <h1>Pollution and Institution Data by Year</h1>
            {sortedYears.map((year) => (
                <div key={year}>
                    <h2>Year: {year}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name of the institution</th>
                                <th>Name of pollution</th>
                                <th>Volume</th>
                                <th>Mass flow</th>
                                <th>Emission limit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {combinedDataByYear[year].length > 0 ? (
                                combinedDataByYear[year].map((facility) => (
                                    <tr key={`${facility.pollutionId}-${facility.pollutionName}`}>
                                        <td>{facility.facilityName}</td>
                                        <td>
                                            {editedData[`${facility.pollutionId}-${facility.pollutionName}`]?.name || facility.pollutionName || ''}
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={editedData[`${facility.pollutionId}-${facility.pollutionName}`]?.volume || facility.volume || ''}
                                                onChange={(e) => handleInputChange(facility.pollutionId, facility.pollutionName, 'volume', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={editedData[`${facility.pollutionId}-${facility.pollutionName}`]?.massFlowRate || facility.massFlowRate || ''}
                                                onChange={(e) => handleInputChange(facility.pollutionId, facility.pollutionName, 'massFlowRate', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={editedData[`${facility.pollutionId}-${facility.pollutionName}`]?.emissionsLimit || facility.emissionsLimit || ''}
                                                onChange={(e) => handleInputChange(facility.pollutionId, facility.pollutionName, 'emissionsLimit', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => handleSave(facility.pollutionId, facility.pollutionName)}>Save</button>
                                            <button onClick={() => handleDelete(facility.pollutionId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>no data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default PollutionPage;
