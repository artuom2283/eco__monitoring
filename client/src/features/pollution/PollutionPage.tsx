import React, { useEffect, useState, useMemo } from 'react';
import './pollution.css';
import '../../App.css';
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
        const loadData = async () => {
            await dispatch(fetchPollutionsAsync());
            await dispatch(fetchFacilitiesAsync());
            await dispatch(fetchFacilitiesWithPollutionAsync());
        };

        if (!pollutionsLoaded || !facilitiesLoaded || !pollutionsWithFacilitiesLoaded) {
            loadData();
        }
    }, []);

    const handleSave = async (pollutionId: number, pollutionName: string) => {
        const facilityKey = `${pollutionId}-${pollutionName}`;
        const existingFacility = combinedData.find(facility => facility.pollutionId === pollutionId && facility.pollutionName === pollutionName);
        const editedPollution = editedData[facilityKey];

        if (editedPollution && existingFacility && existingFacility.pollution) {
            const updatedPollution = {
                ...existingFacility.pollution,
                ...editedPollution
            };

            try {
                console.log("Saving pollution data:", updatedPollution);
                await dispatch(updatePollutionAsync(updatedPollution));
                setEditedData(prev => {
                    const newData = { ...prev };
                    delete newData[facilityKey];
                    return newData;
                });

                alert("Changes saved successfully!");
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
                await dispatch(deletePollutionAsync(pollutionToDelete.id));
                alert("Record deleted successfully!");
            } catch (error) {
                alert("Failed to delete record.");
            }
        }
    };

    const combinedData: FullFacilityWithPollution[] = useMemo(() => {
        return fullFacilities.map((facility: any) => ({
            ...facility,
            pollution: pollutions.find((p: any) => p.id === facility.pollutionId) || null,
        }));
    }, [fullFacilities, pollutions]);

    const [combinedDataByYear, setCombinedDataByYear] = useState<{ [key: string]: FullFacilityWithPollution[] }>({});

    useEffect(() => {
        const dataByYear: { [key: string]: FullFacilityWithPollution[] } = {};
        combinedData.forEach((facility) => {
            const year = facility.pollution?.year || 'no data xD';
            if (!dataByYear[year]) {
                dataByYear[year] = [];
            }
            dataByYear[year].push(facility);
        });
        setCombinedDataByYear(dataByYear);
    }, [combinedData]);

    const sortedYears = Object.keys(combinedDataByYear).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

    const handleInputChange = (pollutionId: number, pollutionName: string, fieldName: keyof FullIndustrialFacilityDto, value: any) => {
        setEditedData(prev => {
            const facilityKey = `${pollutionId}-${pollutionName}`;
            const updatedFacility = combinedData.find(
                facility => facility.pollutionId === pollutionId && facility.pollutionName === pollutionName
            );

            if (!updatedFacility) return prev;

            const updatedPollution = {
                ...prev[facilityKey],
                [fieldName]: value
            };

            return {
                ...prev,
                [facilityKey]: updatedPollution
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
                                            {editedData[`${facility.pollutionId}-${facility.pollutionName}`]?.name || facility.pollution?.name || ''}
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={editedData[`${facility.pollutionId}-${facility.pollutionName}`]?.volume || facility.pollution?.volume || ''}
                                                onChange={(e) => handleInputChange(facility.pollutionId, facility.pollutionName, 'volume', parseFloat(e.target.value))}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={editedData[`${facility.pollutionId}-${facility.pollutionName}`]?.massFlowRate || facility.pollution?.massFlowRate || ''}
                                                onChange={(e) => handleInputChange(facility.pollutionId, facility.pollutionName, 'massFlowRate', parseFloat(e.target.value))}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={editedData[`${facility.pollutionId}-${facility.pollutionName}`]?.emissionsLimit || facility.pollution?.emissionsLimit || ''}
                                                onChange={(e) => handleInputChange(facility.pollutionId, facility.pollutionName, 'emissionsLimit', parseFloat(e.target.value))}
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
