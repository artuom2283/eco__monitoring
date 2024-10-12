import React, {useEffect, useState, useMemo} from 'react';
import './pollution.css';
import '../../App.css';
import {useAppSelector} from '../../app/store/configureStore';
import {
    fetchReportsAsync,
    deleteReportAsync,
    fetchPollutionsAsync,
    fetchFacilitiesAsync,
    updateReportAsync, fetchReportsByNameAsync, fetchSortedReportsAsync, updatePollutionAsync,
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
import {PollutionDto} from "../../app/models/Pollution";

const PollutionPage: React.FC = () => {
    const dispatch = useDispatch<any>();
    const reportsLoaded = useAppSelector(state => state.pollution.reportsLoaded);
    const facilitiesLoaded = useAppSelector(state => state.pollution.facilitiesLoaded);
    const pollutionsLoaded = useAppSelector(state => state.pollution.pollutionsLoaded);
    const reports = useAppSelector((state: any) => state.pollution.reports);
    const pollutions = useAppSelector(state => state.pollution.pollutions);
    const [_, setSortOrder] = useState<'asc' | 'desc'>('asc');

    console.log(reports);

    const [searchResults, setSearchResults] = useState<FullReportDto[]>([]);
    const [editReport, setEditReport] = useState<{ [key: number]: FullReportDto }>({});
    const [editPollution, setEditPollution] = useState<{ [key: string]: PollutionDto }>({});

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
        const pollution = pollutions.find((p: PollutionDto) => p.name === report.pollutionName);

        if (editPollution !== undefined) {
            for (const key in editPollution) {
                const updatedPollution = {
                    ...pollution,
                    ...editPollution[key],
                };

                console.log("Saving pollution data:", updatedPollution);
                await dispatch(updatePollutionAsync(updatedPollution));
                console.log("Changes saved successfully!");
                await dispatch(fetchPollutionsAsync());
                await dispatch(fetchReportsAsync());
            }
        }

        try {
            const updatedReport = {
                ...report,
                ...editReport[reportId],
            };
            console.log("Saving report data:", updatedReport);
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

    const handleInputChange = (id: string, field: keyof PollutionDto, value: any) => {
        setEditPollution((prevValues) => ({
            ...prevValues,
            [id]: {
                ...prevValues[id],
                [field]: value,
            },
        }));
    }

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
        <div className="page-container">
            <div className="form-section">
                <div className="forms-grid">
                    <div className="forms-flex">
                        <div className="facility-form">
                            <AddFacilityForm/>
                        </div>
                        <div className="pollution-form">
                            <AddPollutionForm/>
                        </div>
                    </div>
                    <div className="report-form">
                        <AddReportForm/>
                    </div>
                </div>
            </div>

            <div className="reports-section">
                <h1>Reports (Pollution and Facility By Year)</h1>
                <SearchBar onSearch={handleSearch}/>
                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Name of the facility</th>
                            <th>Name of pollution</th>
                            <th>
                                <div className="sorting-buttons">
                                    <span>Year</span>
                                    <div className="sort-button-container">
                                        <div className="sort-button">
                                            <AscButton param={SortBy.Year} sort={handleSort}/>
                                        </div>
                                        <div className="sort-button">
                                            <DescButton param={SortBy.Year} sort={handleSort}/>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="sorting-buttons">
                                    <span>Volume, tons</span>
                                    <div className="sort-button-container">
                                        <div className="sort-button">
                                            <AscButton param={SortBy.Volume} sort={handleSort}/>
                                        </div>
                                        <div className="sort-button">
                                            <DescButton param={SortBy.Volume} sort={handleSort}/>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="sorting-buttons">
                                    <span>Mass Flow Rate, gram/hour</span>
                                    <div className="sort-button-container">
                                        <div className="sort-button">
                                            <AscButton param={SortBy.MassFlowRate} sort={handleSort}/>
                                        </div>
                                        <div className="sort-button">
                                            <DescButton param={SortBy.MassFlowRate} sort={handleSort}/>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="sorting-buttons">
                                    <span>Emissions Limit, mg/m^3</span>
                                    <div className="sort-button-container">
                                        <div className="sort-button">
                                            <AscButton param={SortBy.EmissionsLimit} sort={handleSort}/>
                                        </div>
                                        <div className="sort-button">
                                            <DescButton param={SortBy.EmissionsLimit} sort={handleSort}/>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="sorting-buttons">
                                    <span>Tax Rate, grn</span>
                                    <div className="sort-button-container">
                                        <div className="sort-button">
                                            <AscButton param={SortBy.TaxRate} sort={handleSort}/>
                                        </div>
                                        <div className="sort-button">
                                            <DescButton param={SortBy.TaxRate} sort={handleSort}/>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th>Tax Type</th>
                            <th>
                                <div className="sorting-buttons">
                                    <span>Tax Amount, grn</span>
                                    <div className="sort-button-container">
                                        <div className="sort-button">
                                            <AscButton param={SortBy.TaxAmount} sort={handleSort}/>
                                        </div>
                                        <div className="sort-button">
                                            <DescButton param={SortBy.TaxAmount} sort={handleSort}/>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {displayedReports.map((report: FullReportDto) => (
                            <tr key={report.id}>
                                <td>{report.facilityName}</td>
                                <td>{report.pollutionName}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={editReport[report.id]?.year ?? report.year}
                                        onChange={(e) => handleInputChangeReport(report.id, 'year', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editReport[report.id]?.volume ?? report.volume}
                                        onChange={(e) => handleInputChangeReport(report.id, 'volume', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editPollution[report.pollutionName]?.massFlowRate ?? report.massFlowRate}
                                        onChange={(e) => handleInputChange(report.pollutionName, 'massFlowRate', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editPollution[report.pollutionName]?.emissionsLimit ?? report.emissionsLimit}
                                        onChange={(e) => handleInputChange(report.pollutionName, 'emissionsLimit', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editReport[report.id]?.taxRate ?? report.taxRate}
                                        onChange={(e) => handleInputChangeReport(report.id, 'taxRate', e.target.value)}
                                    />
                                </td>
                                <td>{report.taxType}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={editReport[report.id]?.taxAmount ?? report.taxAmount}
                                        onChange={(e) => handleInputChangeReport(report.id, 'taxAmount', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleSave(report.id)}>Save</button>
                                    <button onClick={() => handleDelete(report.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <FacilityInfoTable/>
                <PollutionInfoTable/>
            </div>
            <TopButton/>
        </div>
    );
};

export default PollutionPage;
