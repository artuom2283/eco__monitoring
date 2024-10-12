import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import React, {useEffect, useState} from "react";
import {ReportDto} from "../../app/models/Report";
import {addReportAsync, fetchPollutionsAsync, fetchReportsAsync} from "../../features/pollution/pollutionSlice";
import {PollutionDto} from "../../app/models/Pollution";
import {IndustrialFacilityDto} from "../../app/models/Facility";
import {SuccessNotification} from "../SuccessNotification";

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
        taxAmount: 0,
        additionalFields: {
            isLakeDischarge: '',
            isUrbanArea: '',
            electricityUsage: 0,
            highWasteCorrectionCoeff: 0,
            lowMediumWasteCorrectionCoeff: 0,
            lowMediumWasteStorageCost: 0,
            highWasteStorageCostCurrent: 0,
            lowMediumWasteStorageCostPre2009: 0,
            highWasteStorageCostPre2009: 0,
            lowMediumWasteAcceptedVolume: 0,
            highWasteAcceptedVolume: 0,
            lowMediumWasteAccumulatedVolume: 0,
            highWasteAccumulatedVolume: 0,
            category: 0,
            calendarQuarters: 0
        }
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
            newReport.taxAmount = calculateTaxAmount();
            await dispatch(addReportAsync(newReport)).unwrap();
            SuccessNotification();
            console.log("New report added successfully!");
            setNewReport({
                id: 0,
                pollutionId: 0,
                industrialFacilityId: 0,
                year: 0,
                volume: 0,
                taxType: '',
                taxRate: 0,
                taxAmount: 0,
                additionalFields: {
                    isLakeDischarge: '',
                    isUrbanArea: '',
                    electricityUsage: 0,
                    highWasteCorrectionCoeff: 0,
                    lowMediumWasteCorrectionCoeff: 0,
                    lowMediumWasteStorageCost: 0,
                    highWasteStorageCostCurrent: 0,
                    lowMediumWasteStorageCostPre2009: 0,
                    highWasteStorageCostPre2009: 0,
                    lowMediumWasteAcceptedVolume: 0,
                    highWasteAcceptedVolume: 0,
                    lowMediumWasteAccumulatedVolume: 0,
                    highWasteAccumulatedVolume: 0,
                    category: 0,
                    calendarQuarters: 0
                }
            });
            await dispatch(fetchReportsAsync());
        } catch (error) {
            console.error("Error adding report:", error);
        }
    };

    const calculateTaxAmount = () => {
        let result = 0;
        switch (newReport.taxType) {
            case 'Air Tax':
                newReport.taxType = "Викиди в атмосферне повітря";
                for (let i = 1; i <= 3.14; i++) {
                    result += newReport.volume * newReport.taxRate;
                }

                return result;
            case 'Water Tax':
                newReport.taxType = "Скиди забруднюючих речовин у водні об'єкти";
                let waterCoefficient = 1;
                for (let i = 1; i <= 3.14; i++) {
                    if (newReport.additionalFields.isLakeDischarge === 'Yes') {
                        waterCoefficient = 1.5;
                    }
                    result += newReport.volume * newReport.taxRate * waterCoefficient;
                }

                return result;
            case 'Storage Tax':
                newReport.taxType = "Розміщення відходів";
                let coefficient = 1;
                for (let i = 1; i <= 3.14; i++) {
                    if (newReport.additionalFields.isUrbanArea === 'Yes') {
                        coefficient = 3;
                    }
                    result += newReport.volume * newReport.taxRate * coefficient;
                }

                return result;
            case 'Radioactive Tax':
                newReport.taxType = "Утворення радіоактивних відходів";
                const H  = 0.0133;
                result = newReport.additionalFields.electricityUsage * H
                + (newReport.additionalFields.lowMediumWasteAcceptedVolume * newReport.additionalFields.lowMediumWasteCorrectionCoeff
                * newReport.additionalFields.lowMediumWasteStorageCost + newReport.additionalFields.highWasteAcceptedVolume
                * newReport.additionalFields.highWasteStorageCostCurrent * newReport.additionalFields.highWasteCorrectionCoeff)
                + 1 / 32 * (newReport.additionalFields.lowMediumWasteStorageCostPre2009 * newReport.additionalFields.lowMediumWasteCorrectionCoeff
                * newReport.additionalFields.lowMediumWasteAccumulatedVolume + newReport.additionalFields.highWasteStorageCostPre2009
                * newReport.additionalFields.highWasteCorrectionCoeff * newReport.additionalFields.highWasteAccumulatedVolume);

                newReport.taxRate = H;

                return result;
            case 'Storage Radioactive Tax':
                newReport.taxType = "Тимчасове зберігання радіоактивних відходів їх виробниками поза терміном, встановленим спеціальними умовами ліцензії";
                let tax = 632539.66;
                if (newReport.additionalFields.category === 2) {
                    tax = 11807.40;
                }

                newReport.taxRate = tax;

                return newReport.volume * newReport.additionalFields.calendarQuarters * tax;
            default:
                return 0;
        }
    }

    const renderTaxSpecificFields = () => {
        switch (newReport.taxType) {
            case 'Air Tax':
                return null;
            case 'Water Tax':
                return (
                    <>
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
                        <label htmlFor="isUrbanArea">Do not ensure the complete exclusion of atmospheric air pollution
                            or
                            water objects.? (Yes/No):</label>
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
                        <label htmlFor="highWasteCorrectionCoeff">Enter the correction coefficient for high-activity
                            waste:</label>
                        <input
                            id="highWasteCorrectionCoeff"
                            type="number"
                            placeholder="Correction Coefficient"
                            onChange={(e) => handleAddReportChange('highWasteCorrectionCoeff', parseFloat(e.target.value))}
                        />
                        <label htmlFor="lowMediumWasteCorrectionCoeff">Enter the correction coefficient for
                            medium/low-activity waste:</label>
                        <input
                            id="lowMediumWasteCorrectionCoeff"
                            type="number"
                            placeholder="Correction Coefficient"
                            onChange={(e) => handleAddReportChange('lowMediumWasteCorrectionCoeff', parseFloat(e.target.value))}
                        />
                        <label htmlFor="lowMediumWasteStorageCost">Enter the storage cost per cubic meter for
                            low/medium-activity radioactive waste ($):</label>
                        <input
                            id="lowMediumWasteStorageCost"
                            type="number"
                            placeholder="Storage Cost ($)"
                            onChange={(e) => handleAddReportChange('lowMediumWasteStorageCost', parseFloat(e.target.value))}
                        />
                        <label htmlFor="highWasteStorageCostCurrent">Enter the storage cost per cubic meter for
                            high-activity radioactive waste generated by producers ($):</label>
                        <input
                            id="highWasteStorageCostCurrent"
                            type="number"
                            placeholder="Storage Cost ($)"
                            onChange={(e) => handleAddReportChange('highWasteStorageCostCurrent', parseFloat(e.target.value))}
                        />
                        <label htmlFor="lowMediumWasteStorageCostPre2009">Enter the storage cost per cubic meter for
                            low/medium-activity radioactive waste accumulated by producers before April 1, 2009
                            ($):</label>
                        <input
                            id="lowMediumWasteStorageCostPre2009"
                            type="number"
                            placeholder="Storage Cost ($)"
                            onChange={(e) => handleAddReportChange('lowMediumWasteStorageCostPre2009', parseFloat(e.target.value))}
                        />
                        <label htmlFor="highWasteStorageCostPre2009">Enter the storage cost per cubic meter for
                            high-activity radioactive waste accumulated by producers before April 1, 2009 ($):</label>
                        <input
                            id="highWasteStorageCostPre2009"
                            type="number"
                            placeholder="Storage Cost ($)"
                            onChange={(e) => handleAddReportChange('highWasteStorageCostPre2009', parseFloat(e.target.value))}
                        />
                        <label htmlFor="lowMediumWasteAcceptedVolume">Enter the actual volume of low/medium-activity
                            radioactive waste accepted by storage operators (m³):</label>
                        <input
                            id="lowMediumWasteAcceptedVolume"
                            type="number"
                            placeholder="Volume (m³)"
                            onChange={(e) => handleAddReportChange('lowMediumWasteAcceptedVolume', parseFloat(e.target.value))}
                        />
                        <label htmlFor="highWasteAcceptedVolume">Enter the actual volume of high-activity radioactive
                            waste accepted by storage operators (m³):</label>
                        <input
                            id="highWasteAcceptedVolume"
                            type="number"
                            placeholder="Volume (m³)"
                            onChange={(e) => handleAddReportChange('highWasteAcceptedVolume', parseFloat(e.target.value))}
                        />
                        <label htmlFor="lowMediumWasteAccumulatedVolume">Enter the actual volume of low/medium-activity
                            radioactive waste accumulated in the storage by operators (m³):</label>
                        <input
                            id="lowMediumWasteAccumulatedVolume"
                            type="number"
                            placeholder="Volume (m³)"
                            onChange={(e) => handleAddReportChange('lowMediumWasteAccumulatedVolume', parseFloat(e.target.value))}
                        />
                        <label htmlFor="highWasteAccumulatedVolume">Enter the actual volume of high-activity radioactive
                            waste accumulated in the storage by operators (m³):</label>
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
                <option value="Air Tax">Emissions of pollutants into the atmosphere by stationary sources of pollution
                </option>
                <option value="Water Tax">Discharges of pollutants into water bodies
                </option>
                <option value="Storage Tax">Waste placement</option>
                <option value="Radioactive Tax">Generation of radioactive waste</option>
                <option value="Storage Radioactive Tax">Temporary storage of radioactive waste by their producers beyond
                    the term established by the special conditions of the license
                </option>
            </select>
            {renderTaxSpecificFields()}
            <button onClick={handleAddReport}>Add Report</button>
        </div>
    )
}