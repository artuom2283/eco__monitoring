import React, {useEffect, useState, useMemo} from 'react';
import './pollution.css';
import '../../App.css';
import SortAscImg from '../../assets/arrow-up.png';
import SortDescImg from '../../assets/arrow-down.png';
import {useAppDispatch, useAppSelector} from '../../app/store/configureStore';
import {
    fetchPollutionsAsync,
    fetchFacilitiesAsync,
    fetchFacilitiesWithPollutionAsync,
    updatePollutionAsync,
    deletePollutionAsync,
    fetchFacilitiesWithPollutionByAscendingAsync,
    fetchFacilitiesWithPollutionByDescendingAsync
} from './pollutionSlice';
import {FullIndustrialFacilityDto, IndustrialFacilityDto} from '../../app/models/Facility';
import {PollutionDto} from '../../app/models/Pollution';
import {AddFacilityForm} from "../../components/AddFacilityForm";
import {AddPollutionForm} from "../../components/AddPollutionForm";
import {SearchBar} from "../../components/SearchBar";
import {TopButton} from "../../components/TopButton";
import {FacilityInfoTable} from "../../components/FacilityInfoTable";
import {AddReportForm} from "../../components/AddReportForm";
import {PollutionInfoTable} from "../../components/PollutionInfoTable";

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
    const [_, setSortOrder] = useState<'asc' | 'desc'>('asc');

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


    const handleSort = async (order: 'asc' | 'desc') => {
        setSortOrder(order);
        if (order === 'asc') {
            await dispatch(fetchFacilitiesWithPollutionByAscendingAsync());
        } else {
            await dispatch(fetchFacilitiesWithPollutionByDescendingAsync());
        }
    };

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
                    const newData = {...prev};
                    delete newData[facilityKey];
                    return newData;
                });

                console.log("Changes saved successfully!");
            } catch (error) {
                console.error("Save error:", error);
                console.log("Failed to save changes.");
            }
        } else {
            console.log("No changes to save.");
        }
    };

    const handleDelete = async (facilityId: number) => {
        try {
            await dispatch(deletePollutionAsync(facilityId));
            console.log("Record deleted successfully!");
        } catch (error) {
            console.log("Failed to delete record.");
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

    const sortedYears = Object.keys(combinedDataByYear).sort((a, b) => b.localeCompare(a, undefined, {numeric: true}));

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
            <div className="flex-form">
            <AddFacilityForm></AddFacilityForm>
            <AddPollutionForm></AddPollutionForm>
            </div>
            <AddReportForm></AddReportForm>
            <h1>Pollution and Institution Data by Year</h1>
            <SearchBar></SearchBar>
            {sortedYears.map((year) => {
                const validFacilities = combinedDataByYear[year].filter(facility => facility.pollution?.volume !== null && facility.pollution?.volume !== undefined);

                if (validFacilities.length === 0) {
                    return null;
                }

                return (
                    <div key={year}>
                        <h2>Year: {year}</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>Name of the institution</th>
                                <th>Name of pollution</th>
                                <th>
                                    <div className="sorting-buttons">
                                        Volume
                                    <button className='sort-button sort-ascending' onClick={() => handleSort('asc')}><img src={SortAscImg} alt="Sort Ascending" className="small-img"/></button>
                                    <button className='sort-button sort-descending' onClick={() => handleSort('desc')}><img src={SortDescImg} alt="Sort Descending" className="small-img"/></button>
                                 </div>
                            </th>
                                <th>Mass flow</th>
                                <th>Emission limit</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {validFacilities.map((facility) => (
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
                                        <button
                                            onClick={() => handleSave(facility.pollutionId, facility.pollutionName)}>Save
                                        </button>
                                        <button onClick={() => handleDelete(facility.pollutionId)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}
            <FacilityInfoTable></FacilityInfoTable>
          {/*  <PollutionInfoTable></PollutionInfoTable>*/}
            <TopButton></TopButton>
        </div>
    );
};

export default PollutionPage;
