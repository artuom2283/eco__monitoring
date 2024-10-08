import React, {useEffect, useState, useMemo} from 'react';
import './pollution.css';
import '../../App.css';
import {useAppSelector} from '../../app/store/configureStore';
import {
    fetchReportsAsync,
    deleteReportAsync,
    fetchPollutionsAsync,
    fetchFacilitiesAsync,
    updateReportAsync, fetchReportsByNameAsync, fetchSortedReportsAsync,
} from './pollutionSlice';
import {AddFacilityForm} from "../../components/Forms/AddFacilityForm";
import {AddPollutionForm} from "../../components/Forms/AddPollutionForm";
import {SearchBar} from "../../components/SearchBar";
import {TopButton} from "../../components/Buttons/TopButton";
import {FacilityInfoTable} from "../../components/Tables/FacilityInfoTable";
import {AddReportForm} from "../../components/Forms/AddReportForm";
import {PollutionInfoTable} from "../../components/Tables/PollutionInfoTable";
import {FullReportDto, ReportDto} from "../../app/models/Report";
import {useDispatch} from "react-redux";
import {SortBy} from "../../app/Enums/SortBy";
import {AscButton} from "../../components/Buttons/AscButton";
import {DescButton} from "../../components/Buttons/DescButton";

const PollutionPage: React.FC = () => {
    const dispatch = useDispatch<any>();
    const reportsLoaded = useAppSelector(state => state.pollution.reportsLoaded);
    const facilitiesLoaded = useAppSelector(state => state.pollution.facilitiesLoaded);
    const pollutionsLoaded = useAppSelector(state => state.pollution.pollutionsLoaded);
    const reports = useAppSelector((state: any) => state.pollution.reports);
    const [_, setSortOrder] = useState<'asc' | 'desc'>('asc');

    console.log(reports);

    const [searchResults, setSearchResults] = useState<FullReportDto[]>([]);
    const [editReport, setEditReport] = useState<{ [key: number]: FullReportDto }>({});

    useEffect(() => {
        const loadData = async () => {
            if (!pollutionsLoaded) await dispatch(fetchPollutionsAsync());
            if (!facilitiesLoaded) await dispatch(fetchFacilitiesAsync());
            if (!reportsLoaded) await dispatch(fetchReportsAsync());
        };

        loadData();
    }, [pollutionsLoaded, facilitiesLoaded, reportsLoaded, dispatch]);

    const handleSearch = async (searchTerm: string) => {
        if (searchTerm.trim()) {
            const result = await dispatch(fetchReportsByNameAsync(searchTerm));
            setSearchResults(result.payload || []);
        } else {
            setSearchResults([]);
            await dispatch(fetchReportsAsync());
        }
    };

    const handleSave = async (reportId: number) => {
        const report = reports.find((r: FullReportDto) => r.id === reportId);

        if (!report) {
            console.log("Report not found!");
            return;
        }

        try {
            const updatedReport = {
                ...report,
                ...editReport[reportId],
            };
            console.log("Saving pollution data:", updatedReport);
            await dispatch(updateReportAsync(updatedReport));
            console.log("Changes saved successfully!");
            await dispatch(fetchReportsAsync());
        } catch (error) {
            console.error("Save error:", error);
            console.log("Failed to save changes.");
        }
    };

    const handleDelete = async (reportId: number) => {
        try {
            await dispatch(deleteReportAsync(reportId));
            console.log("Report deleted successfully!");
            await dispatch(fetchReportsAsync());
        } catch (error) {
            console.log("Failed to delete report.");
        }
    };

    const handleSort = async (param: string, order: 'asc' | 'desc') => {
        setSortOrder(order);
        const FetchSortedReportsAsync = {
            param: param,
            orderBy: "asc"
        }
        if (order === 'asc') {
            const result = await dispatch(fetchSortedReportsAsync(FetchSortedReportsAsync));
            setSearchResults(result.payload || []);
        } else {
            FetchSortedReportsAsync.orderBy = "desc";
            const search = await dispatch(fetchSortedReportsAsync(FetchSortedReportsAsync));
            setSearchResults(search.payload || []);
        }
    };

    const handleInputChangeReport = (id: number, field: keyof FullReportDto, value: any) => {
        setEditReport((prevValues) => ({
            ...prevValues,
            [id]: {
                ...prevValues[id],
                [field]: value,
            },
        }));
    };

    const displayedReports = searchResults.length > 0 ? searchResults : reports;

    return (
        <div>
            <div className="flex-form">
                <AddFacilityForm/>
                <AddPollutionForm/>
            </div>
            <AddReportForm/>
            <h1>Reports (Pollution and Facility By Year)</h1>
            <SearchBar onSearch={handleSearch}/>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Name of the facility</th>
                        <th>Name of pollution</th>
                        <th>
                            <div className="sorting-buttons">
                                Year
                                <AscButton param={SortBy.Year} sort={handleSort}/>
                                <DescButton param={SortBy.Year} sort={handleSort}/>
                            </div>
                        </th>
                        <th>
                            <div className="sorting-buttons">
                                Volume, tons
                                <AscButton param={SortBy.Volume} sort={handleSort}/>
                                <DescButton param={SortBy.Volume} sort={handleSort}/>
                            </div>
                        </th>
                        <th>
                            <div className="sorting-buttons">
                                Mass Flow Rate, gram/hour
                                <AscButton param={SortBy.MassFlowRate} sort={handleSort}/>
                                <DescButton param={SortBy.MassFlowRate}  sort={handleSort}/>
                            </div>
                        </th>
                        <th>
                            <div className="sorting-buttons">
                                Emissions Limit, mg/m^3
                                <AscButton param={SortBy.EmissionsLimit} sort={handleSort}/>
                                <DescButton param={SortBy.EmissionsLimit} sort={handleSort}/>
                            </div>
                        </th>
                        <th>
                            <div className="sorting-buttons">
                                Tax Rate, grn
                                <AscButton param={SortBy.TaxRate} sort={handleSort}/>
                                <DescButton param={SortBy.TaxRate} sort={handleSort}/>
                            </div>
                        </th>
                        <th>
                            Tax Type
                        </th>
                        <th>
                            <div className="sorting-buttons">
                                Tax Amount, grn
                                <AscButton param={SortBy.TaxAmount} sort={handleSort}/>
                                <DescButton param={SortBy.TaxAmount} sort={handleSort}/>
                            </div>
                        </th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedReports.map((report: FullReportDto) => (
                        <tr>
                            <td>{report.facilityName}</td>
                            <td>{report.pollutionName}</td>
                            <td><input
                                type="text"
                                value={editReport[report.id]?.year ?? report.year}
                                onChange={(e) => handleInputChangeReport(report.id, 'year', e.target.value)}
                            /></td>
                            <td><input
                                type="text"
                                value={editReport[report.id]?.volume ?? report.volume}
                                onChange={(e) => handleInputChangeReport(report.id, 'volume', e.target.value)}
                            /></td>
                            <td><input
                                type="text"
                                value={editReport[report.id]?.massFlowRate ?? report.massFlowRate}
                                onChange={(e) => handleInputChangeReport(report.id, 'massFlowRate', e.target.value)}
                            /></td>
                            <td><input
                                type="text"
                                value={editReport[report.id]?.emissionsLimit ?? report.emissionsLimit}
                                onChange={(e) => handleInputChangeReport(report.id, 'emissionsLimit', e.target.value)}
                            /></td>
                            <td><input
                                type="text"
                                value={editReport[report.id]?.taxRate ?? report.taxRate}
                                onChange={(e) => handleInputChangeReport(report.id, 'taxRate', e.target.value)}
                            /></td>
                            <td>
                                {report.taxType}
                            </td>
                            <td>
                                <input
                                type="text"
                                value={editReport[report.id]?.taxAmount ?? report.taxAmount}
                                onChange={(e) => handleInputChangeReport(report.id, 'taxAmount', e.target.value)}
                            /></td>
                            <td>
                                <button
                                    onClick={() => handleSave(report.id)}>Save
                                </button>
                                <button onClick={() => handleDelete(report.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <FacilityInfoTable/>
            <PollutionInfoTable/>
            <TopButton/>
        </div>
    );
};

export default PollutionPage;
