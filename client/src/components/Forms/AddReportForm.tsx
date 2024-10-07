import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import React, {useEffect, useState} from "react";
import {ReportDto} from "../../app/models/Report";
import {addReportAsync, fetchPollutionsAsync, fetchReportsAsync} from "../../features/pollution/pollutionSlice";
import {PollutionDto} from "../../app/models/Pollution";
import {IndustrialFacilityDto} from "../../app/models/Facility";

export const AddReportForm = () => {
    const dispatch = useAppDispatch();

    const pollutions = useAppSelector(state => state.pollution.pollutions);
    const facilities = useAppSelector((state: any) => state.pollution.facilities);

    const [newReport, setNewReport] = React.useState({
        id: 0,
        pollutionId: 0,
        industrialFacilityId: 0,
        year: 0,
        volume: 0,
        waterTax: 0,
        airTax: 0,
    });

    const handleAddReportChange = (field: keyof ReportDto, value: any) => {
        setNewReport(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddReport = async () => {
        try {
            console.log("Adding new report:", newReport);
            await dispatch(addReportAsync(newReport));
            console.log("New report added successfully!");
            setNewReport({
                id: 0,
                pollutionId: 0,
                industrialFacilityId: 0,
                year: 0,
                volume: 0,
                waterTax: 0,
                airTax: 0,
            });
            await dispatch(fetchReportsAsync());
        } catch (error) {
            console.error("Error adding report:", error);
        }
    };

    return (
        <div className="add-form" id="add-report-form">
            <h2>Add New Report</h2>
            <label htmlFor="facility-id">Facility Name:</label>
            <select
                id="facility-id"
                value={newReport.industrialFacilityId}
                onChange={(e) => handleAddReportChange('industrialFacilityId', parseInt(e.target.value))}
            >
                <option value={0} disabled>Select Facility</option>
                {facilities.map((facility: IndustrialFacilityDto) => (
                    <option key={facility.id} value={facility.id}>
                        {facility.name}
                    </option>
                ))}
            </select>
            <label htmlFor="pollution-id">Pollution Name:</label>
            <select
                id="pollution-id"
                value={newReport.pollutionId}
                onChange={(e) => handleAddReportChange('pollutionId', parseInt(e.target.value))}
            >
                <option value={0} disabled>Select Pollution</option>
                {pollutions.map((pollution: PollutionDto) => (
                    <option key={pollution.id} value={pollution.id}>
                        {pollution.name}
                    </option>
                ))}
            </select>
            <label htmlFor="report-year">Year:</label>
            <input
                id={"report-year"}
                type="number"
                placeholder="Report Year"
                value={newReport.year}
                onChange={(e) => handleAddReportChange('year', parseFloat(e.target.value))}
            />
            <label htmlFor="report-volume">Volume:</label>
            <input
                id={"report-volume"}
                type="number"
                placeholder="Pollution Volume"
                value={newReport.volume}
                onChange={(e) => handleAddReportChange('volume', parseFloat(e.target.value))}
            />
            <label htmlFor="report-waterTax">Water Tax:</label>
            <input
                id={"report-waterTax"}
                type="number"
                placeholder="Water Tax"
                value={newReport.waterTax}
                onChange={(e) => handleAddReportChange('waterTax', parseFloat(e.target.value))}
            />
            <label htmlFor="report-airTax">Air Tax:</label>
            <input
                id={"report-airTax"}
                type="number"
                placeholder="Air Tax"
                value={newReport.airTax}
                onChange={(e) => handleAddReportChange('airTax', parseFloat(e.target.value))}
            />
            <button onClick={handleAddReport}>Add Report</button>
        </div>
    )
}