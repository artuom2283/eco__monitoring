import React, { useEffect, useState } from 'react';
import './pollution.css';
import '../../App.css'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchPollutionsAsync, fetchFacilitiesAsync, fetchFacilitiesWithPollutionAsync } from './pollutionSlice';
import { FullIndustrialFacilityDto } from '../../app/models/Facility';
import { PollutionDto } from '../../app/models/Pollution';
import agent from '../../app/api/agent';

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

  const handleInputChange = (facilityId: number, field: string, value: string | number) => {
    const existingPollution = combinedData.find(facility => facility.id === facilityId)?.pollution;

    if (existingPollution) {
        setEditedData(prev => ({
            ...prev,
            [facilityId]: {
                ...existingPollution, 
                [field]: value 
            }
        }));
    }
  };  

  const handleSave = async (facilityId: number) => {
    const existingPollution = combinedData.find(facility => facility.id === facilityId)?.pollution;
    const editedPollution = editedData[facilityId];

    if (editedPollution && existingPollution) {
        const updatedPollution = { ...existingPollution, ...editedPollution };

        try {
            console.log("Saving pollution data:", updatedPollution);

            await agent.Pollution.putPollution(updatedPollution.id, updatedPollution);

            setEditedData(prev => {
                const newData = { ...prev };
                delete newData[facilityId];
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
            await agent.Pollution.delPollution(pollutionToDelete.id);
            alert("Record deleted successfully!");
        } catch (error) {
            alert("Failed to delete record.");
        }
    }
  };

    const combinedData: FullFacilityWithPollution[] = fullFacilities.map((facility: FullIndustrialFacilityDto) => ({
        ...facility,
        pollution: pollutions.find((p: PollutionDto) => p.id === facility.pollutionId) || null,
    }));

    const combinedDataByYear: { [key: string]: FullFacilityWithPollution[] } = {};

    combinedData.forEach((facility) => {
        const year = facility.pollution?.year || 'no data xD';
        if (!combinedDataByYear[year]) {
            combinedDataByYear[year] = [];
        }
        combinedDataByYear[year].push(facility);
    });

    const sortedYears = Object.keys(combinedDataByYear).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

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
                              combinedDataByYear[year].map((facility: FullFacilityWithPollution) => (
                                  <tr key={facility.id}>
                                      <td>{facility.facilityName}</td>
                                      <td>
                                          <input 
                                              type="text" 
                                              value={editedData[facility.id]?.name || facility.pollution?.name || ''} 
                                              onChange={(e) => handleInputChange(facility.id, 'name', e.target.value)} 
                                          />
                                      </td>
                                      <td>
                                          <input 
                                              type="number" 
                                              value={editedData[facility.id]?.volume || facility.pollution?.volume || ''} 
                                              onChange={(e) => handleInputChange(facility.id, 'volume', parseFloat(e.target.value))} 
                                          />
                                      </td>
                                      <td>
                                          <input 
                                              type="number" 
                                              value={editedData[facility.id]?.massFlowRate || facility.pollution?.massFlowRate || ''} 
                                              onChange={(e) => handleInputChange(facility.id, 'massFlowRate', parseFloat(e.target.value))} 
                                          />
                                      </td>
                                      <td>
                                          <input 
                                              type="number" 
                                              value={editedData[facility.id]?.emissionsLimit || facility.pollution?.emissionsLimit || ''} 
                                              onChange={(e) => handleInputChange(facility.id, 'emissionsLimit', parseFloat(e.target.value))} 
                                          />
                                      </td>
                                      <td>
                                          <button onClick={() => handleSave(facility.id)}>Save</button>
                                          <button onClick={() => handleDelete(facility.id)}>Delete</button>
                                      </td>
                                  </tr>
                              ))
                          ) : (
                              <tr><td colSpan={6}>no data</td></tr>
                          )}
                      </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default PollutionPage;
