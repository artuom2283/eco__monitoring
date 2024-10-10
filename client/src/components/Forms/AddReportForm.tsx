import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import React, { useEffect, useState } from "react";
import { ReportDto } from "../../app/models/Report";
import { addReportAsync, fetchPollutionsAsync, fetchReportsAsync } from "../../features/pollution/pollutionSlice";
import { PollutionDto } from "../../app/models/Pollution";
import { IndustrialFacilityDto } from "../../app/models/Facility";

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
        taxType: '',
        taxRate: 0,
        additionalFields: {}
    });

    const handleAddReportChange = (field: keyof ReportDto | string, value: any) => {
        if (field in newReport) {
            setNewReport(prev => ({
                ...prev,
                [field]: value
            }));
        } else {
            setNewReport(prev => ({
                ...prev,
                additionalFields: {
                    ...prev.additionalFields,
                    [field]: value
                }
            }));
        }
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
                taxType: '',
                taxRate: 0,
                additionalFields: {}
            });
            await dispatch(fetchReportsAsync());
        } catch (error) {
            console.error("Error adding report:", error);
        }
    };

    const renderTaxSpecificFields = () => {
        switch (newReport.taxType) {
            case 'Water Tax':
                return (
                    <>
                        <label htmlFor="water-taxRate">Water Tax Rate:</label>
                        <input
                            id="water-taxRate"
                            type="number"
                            placeholder="Tax Rate"
                            onChange={(e) => handleAddReportChange('waterTaxRate', parseFloat(e.target.value))}
                        />
                        <label htmlFor="water-dischargeVolume">Discharge Volume:</label>
                        <input
                            id="water-dischargeVolume"
                            type="number"
                            placeholder="Volume"
                            onChange={(e) => handleAddReportChange('dischargeVolume', parseFloat(e.target.value))}
                        />
                        <label htmlFor="isLakeDischarge">Discharge into a lake? (Yes/No):</label>
                        <input
                            id="isLakeDischarge"
                            type="text"
                            placeholder="Yes/No"
                            onChange={(e) => handleAddReportChange('isLakeDischarge', e.target.value)}
                        />
                    </>
                );
            case 'Storage Tax':
                return (
                    <>
                        <label htmlFor="storage-taxRate">Storage Tax Rate:</label>
                        <input
                            id="storage-taxRate"
                            type="number"
                            placeholder="Tax Rate"
                            onChange={(e) => handleAddReportChange('storageTaxRate', parseFloat(e.target.value))}
                        />
                        <label htmlFor="storage-dischargeVolume">Discharge Volume:</label>
                        <input
                            id="storage-dischargeVolume"
                            type="number"
                            placeholder="Volume"
                            onChange={(e) => handleAddReportChange('dischargeVolume', parseFloat(e.target.value))}
                        />
                        <label htmlFor="isUrbanArea">In an urban area? (Yes/No):</label>
                        <input
                            id="isUrbanArea"
                            type="text"
                            placeholder="Yes/No"
                            onChange={(e) => handleAddReportChange('isUrbanArea', e.target.value)}
                        />
                    </>
                );
            case 'Radioactive Tax':
                return (
                    <>
                        <label htmlFor="electricityUsage">Enter the actual amount of electricity used (kWh):</label>
                        <input
                            id="electricityUsage"
                            type="number"
                            placeholder="Electricity Usage (kWh)"
                            onChange={(e) => handleAddReportChange('electricityUsage', parseFloat(e.target.value))}
                        />
                        <label htmlFor="electricityTaxRate">Enter the tax rate for electricity usage (%):</label>
                        <input
                            id="electricityTaxRate"
                            type="number"
                            placeholder="Tax Rate (%)"
                            onChange={(e) => handleAddReportChange('electricityTaxRate', parseFloat(e.target.value))}
                        />
                        <label htmlFor="highWasteCorrectionCoeff">Enter the correction coefficient for high-activity waste:</label>
                        <input
                            id="highWasteCorrectionCoeff"
                            type="number"
                            placeholder="Correction Coefficient"
                            onChange={(e) => handleAddReportChange('highWasteCorrectionCoeff', parseFloat(e.target.value))}
                        />
                        <label htmlFor="lowMediumWasteCorrectionCoeff">Enter the correction coefficient for medium/low-activity waste:</label>
                        <input
                            id="lowMediumWasteCorrectionCoeff"
                            type="number"
                            placeholder="Correction Coefficient"
                            onChange={(e) => handleAddReportChange('lowMediumWasteCorrectionCoeff', parseFloat(e.target.value))}
                        />
                        <label htmlFor="lowMediumWasteStorageCost">Enter the storage cost per cubic meter for low/medium-activity radioactive waste ($):</label>
                        <input
                            id="lowMediumWasteStorageCost"
                            type="number"
                            placeholder="Storage Cost ($)"
                            onChange={(e) => handleAddReportChange('lowMediumWasteStorageCost', parseFloat(e.target.value))}
                        />
                        <label htmlFor="highWasteStorageCostCurrent">Enter the storage cost per cubic meter for high-activity radioactive waste generated by producers ($):</label>
                        <input
                            id="highWasteStorageCostCurrent"
                            type="number"
                            placeholder="Storage Cost ($)"
                            onChange={(e) => handleAddReportChange('highWasteStorageCostCurrent', parseFloat(e.target.value))}
                        />
                        <label htmlFor="lowMediumWasteStorageCostPre2009">Enter the storage cost per cubic meter for low/medium-activity radioactive waste accumulated by producers before April 1, 2009 ($):</label>
                        <input
                            id="lowMediumWasteStorageCostPre2009"
                            type="number"
                            placeholder="Storage Cost ($)"
                            onChange={(e) => handleAddReportChange('lowMediumWasteStorageCostPre2009', parseFloat(e.target.value))}
                        />
                        <label htmlFor="highWasteStorageCostPre2009">Enter the storage cost per cubic meter for high-activity radioactive waste accumulated by producers before April 1, 2009 ($):</label>
                        <input
                            id="highWasteStorageCostPre2009"
                            type="number"
                            placeholder="Storage Cost ($)"
                            onChange={(e) => handleAddReportChange('highWasteStorageCostPre2009', parseFloat(e.target.value))}
                        />
                        <label htmlFor="lowMediumWasteAcceptedVolume">Enter the actual volume of low/medium-activity radioactive waste accepted by storage operators (m³):</label>
                        <input
                            id="lowMediumWasteAcceptedVolume"
                            type="number"
                            placeholder="Volume (m³)"
                            onChange={(e) => handleAddReportChange('lowMediumWasteAcceptedVolume', parseFloat(e.target.value))}
                        />
                        <label htmlFor="highWasteAcceptedVolume">Enter the actual volume of high-activity radioactive waste accepted by storage operators (m³):</label>
                        <input
                            id="highWasteAcceptedVolume"
                            type="number"
                            placeholder="Volume (m³)"
                            onChange={(e) => handleAddReportChange('highWasteAcceptedVolume', parseFloat(e.target.value))}
                        />
                        <label htmlFor="lowMediumWasteAccumulatedVolume">Enter the actual volume of low/medium-activity radioactive waste accumulated in the storage by operators (m³):</label>
                        <input
                            id="lowMediumWasteAccumulatedVolume"
                            type="number"
                            placeholder="Volume (m³)"
                            onChange={(e) => handleAddReportChange('lowMediumWasteAccumulatedVolume', parseFloat(e.target.value))}
                        />
                        <label htmlFor="highWasteAccumulatedVolume">Enter the actual volume of high-activity radioactive waste accumulated in the storage by operators (m³):</label>
                        <input
                            id="highWasteAccumulatedVolume"
                            type="number"
                            placeholder="Volume (m³)"
                            onChange={(e) => handleAddReportChange('highWasteAccumulatedVolume', parseFloat(e.target.value))}
                        />
                    </>
                );
            case 'Storage Radioactive Tax':
                return (
                    <>
                        <label htmlFor="radioactive-category">Category (1 for high, 2 for low):</label>
                        <input
                            id="radioactive-category"
                            type="number"
                            placeholder="1 or 2"
                            onChange={(e) => handleAddReportChange('category', parseInt(e.target.value))}
                        />
                        <label htmlFor="calendarQuarters">Full calendar quarters:</label>
                        <input
                            id="calendarQuarters"
                            type="number"
                            placeholder="Calendar Quarters"
                            onChange={(e) => handleAddReportChange('calendarQuarters', parseFloat(e.target.value))}
                        />
                        <label htmlFor="radioactive-dischargeVolume">Discharge Volume:</label>
                        <input
                            id="radioactive-dischargeVolume"
                            type="number"
                            placeholder="Volume"
                            onChange={(e) => handleAddReportChange('dischargeVolume', parseFloat(e.target.value))}
                        />
                    </>
                );
            default:
                return null;
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
            <label htmlFor="report-taxRate">Tax Rate:</label>
            <input
                id={"report-taxRate"}
                type="number"
                placeholder="Tax Rate"
                value={newReport.taxRate}
                onChange={(e) => handleAddReportChange('taxRate', parseFloat(e.target.value))}
            />
            <label htmlFor="report-taxType">Tax Type:</label>
            <select
                id={"report-taxType"}
                value={newReport.taxType}
                onChange={(e) => handleAddReportChange('taxType', e.target.value)}
            >
                <option value="" disabled>Select Tax Type</option>
                <option value="Water Tax">Water Tax</option>
                <option value="Storage Tax">Storage Tax</option>
                <option value="Radioactive Tax">Radioactive</option>
                <option value="Storage Radioactive Tax">Storage Radioactive</option>
            </select>
            {renderTaxSpecificFields()}
            <button onClick={handleAddReport}>Add Report</button>
        </div>
    )
}