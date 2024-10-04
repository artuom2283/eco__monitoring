import {useAppDispatch} from "../app/store/configureStore";
import React from "react";
import {ReportDto} from "../app/models/Report";
import {addReportAsync} from "../features/pollution/pollutionSlice";

export const AddReportForm = () => {
    const dispatch = useAppDispatch();

    const [newReport, setNewReport] = React.useState({
        id: 0,
        pollutionId: 0,
        facilityId: 0,
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
                facilityId: 0,
                year: 0,
                volume: 0,
                waterTax: 0,
                airTax: 0,
            });
        } catch (error) {
            console.error("Error adding report:", error);
        }
    };

    return (
        <div className="add-form" id="add-report-form">
            <h2>Add New Report</h2>
            <label htmlFor="pollution-id">Pollution Id:</label>
            <input
                id={"pollution-id"}
                type="number"
                placeholder="Pollution Id"
                value={newReport.pollutionId}
                onChange={(e) => handleAddReportChange('pollutionId', parseFloat(e.target.value))}
            />
            <label htmlFor="facility-id">Facility Id:</label>
            <input
                id={"facility-id"}
                type="number"
                placeholder="Facility Id"
                value={newReport.facilityId}
                onChange={(e) => handleAddReportChange('facilityId', parseFloat(e.target.value))}
            />
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