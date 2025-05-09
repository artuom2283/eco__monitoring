import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IndustrialFacilityDto } from "../../app/models/Facility";
import agent from "../../app/api/agent";
import { PollutionDto } from "../../app/models/Pollution";
import {FullReportDto, ReportDto} from "../../app/models/Report";
import {RiskDto} from "../../app/models/Risk";
import {DamageDto} from "../../app/models/Damage";

interface FetchSortedReportsParams {
    param: string;
    orderBy: string;
}

export const fetchFacilitiesAsync = createAsyncThunk<IndustrialFacilityDto[]>(
    "pollutions/fetchFacilitiesAsync",
    async (_, thunkAPI) => {
        try {
            return agent.Facilities.getFacilities();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchFacilityAsync = createAsyncThunk<IndustrialFacilityDto, number>(
    "pollutions/fetchFacilityAsync",
    async (id, thunkAPI) => {
        try {
            return agent.Facilities.getFacility(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchPollutionsAsync = createAsyncThunk<PollutionDto[]>(
    "pollutions/fetchPollutionsAsync",
    async (_, thunkAPI) => {
        try {
            return agent.Pollution.getPollutions();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchRisksAsync = createAsyncThunk<RiskDto[]>(
    "risks/fetchRisksAsync",
    async (_, thunkAPI) => {
        try {
            return agent.Risks.getRisks();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchDamagesAsync = createAsyncThunk<DamageDto[]>(
    "damages/fetchDamagesAsync",
    async (_, thunkAPI) => {
        try {
            return agent.Damages.getDamages();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchPollutionAsync = createAsyncThunk<PollutionDto, number>(
    "pollutions/fetchPollutionAsync",
    async (id, thunkAPI) => {
        try {
            return agent.Pollution.getPollution(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchReportsAsync = createAsyncThunk<FullReportDto[]>(
    "reports/fetchReportsAsync",
    async (_, thunkAPI) => {
        try {
            return agent.Reports.getReports();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const updatePollutionAsync = createAsyncThunk<PollutionDto, PollutionDto>(
    "pollutions/updatePollutionAsync",
    async (pollution, thunkAPI) => {
        try {
            return agent.Pollution.putPollution(pollution);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const updateFacilityAsync = createAsyncThunk<IndustrialFacilityDto, IndustrialFacilityDto>(
    "facilities/updateFacilityAsync",
    async (facility, thunkAPI) => {
        try {
            return agent.Facilities.putFacility(facility);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const updateReportAsync = createAsyncThunk<FullReportDto, FullReportDto>(
    "reports/updateReportAsync",
    async (report, thunkAPI) => {
        try {
            return agent.Reports.putReport(report);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const addPollutionAsync = createAsyncThunk<void, PollutionDto>(
    "pollutions/addPollutionAsync",
    async (pollutionDto, thunkAPI) => {
        try {
            await agent.Pollution.addPollution(pollutionDto);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const addFacilityAsync = createAsyncThunk<void, IndustrialFacilityDto>(
    "facilities/addFacilityAsync",
    async (facilityDto, thunkAPI) => {
        try {
            await agent.Facilities.addFacility(facilityDto);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const addReportAsync = createAsyncThunk<void, ReportDto>(
    "reports/addReportAsync",
    async (reportDto, thunkAPI) => {
        try {
            await agent.Reports.addReport(reportDto);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const addRiskAsync = createAsyncThunk<void, RiskDto>(
    "risks/addRiskAsync",
    async (riskDto, thunkAPI) => {
        try {
            await agent.Risks.addRisk(riskDto);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const addDamageAsync = createAsyncThunk<void, DamageDto>(
    "damages/addDamageAsync",
    async (damageDto, thunkAPI) => {
        try {
            await agent.Damages.addDamage(damageDto);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const deletePollutionAsync = createAsyncThunk<void, number>(
    "pollutions/deletePollutionAsync",
    async (pollutionId, thunkAPI) => {
        try {
            await agent.Pollution.delPollution(pollutionId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const deleteFacilityAsync = createAsyncThunk<void, number>(
    "facilities/deleteFacilityAsync",
    async (facilityId, thunkAPI) => {
        try {
            await agent.Facilities.delFacility(facilityId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const deleteRiskAsync = createAsyncThunk<void, number>(
    "risks/deleteRiskAsync",
    async (riskId, thunkAPI) => {
        try {
            await agent.Risks.delRisk(riskId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const deleteDamageAsync = createAsyncThunk<void, number>(
    "damages/deleteDamageAsync",
    async (damageId, thunkAPI) => {
        try {
            await agent.Damages.delDamage(damageId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const deleteReportAsync = createAsyncThunk<void, number>(
    "reports/deleteReportAsync",
    async (reportId, thunkAPI) => {
        try {
            await agent.Reports.delReport(reportId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchReportsByNameAsync = createAsyncThunk<FullReportDto, string>(
    "reports/fetchReportsByNameAsync",
    async (name, thunkAPI) => {
        try {
            return agent.Reports.getReportsByName(name);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchSortedReportsAsync = createAsyncThunk<FullReportDto, FetchSortedReportsParams>(
    "reports/fetchSortedReportsAsync",
    async (params, thunkAPI) => {
        try {
            return agent.Reports.getSortedReports(params.param, params.orderBy);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);


export const pollutionSlice = createSlice({
    name: "pollution",
    initialState: {
        pollutions: [] as PollutionDto[],
        facilities: [] as IndustrialFacilityDto[],
        reports: [] as FullReportDto[],
        risks : [] as RiskDto[],
        damages: [] as DamageDto[],
        pollutionsLoaded: false,
        facilitiesLoaded: false,
        reportsLoaded: false,
        risksLoaded: false,
        damagesLoaded: false,
        status: 'idle',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {

        // Handle fetchFacilitiesAsync
        builder.addCase(fetchFacilitiesAsync.pending, (state) => {
            state.status = 'loading';
            state.facilitiesLoaded = false;
        });
        builder.addCase(fetchFacilitiesAsync.fulfilled, (state, action) => {
            state.facilities = action.payload;
            state.facilitiesLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFacilitiesAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch facilities';
        });

        // Handle fetchPollutionsAsync
        builder.addCase(fetchPollutionsAsync.pending, (state) => {
            state.status = 'loading';
            state.pollutionsLoaded = false;
        });
        builder.addCase(fetchPollutionsAsync.fulfilled, (state, action) => {
            state.pollutions = action.payload;
            state.pollutionsLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchPollutionsAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch pollutions';
        });

        // Handle fetchRisksAsync
        builder.addCase(fetchRisksAsync.pending, (state) => {
            state.status = 'loading';
            state.risksLoaded = false;
        });
        builder.addCase(fetchRisksAsync.fulfilled, (state, action) => {
            state.risks = action.payload;
            state.risksLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchRisksAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch risks';
        });

        // Handle fetchDamagesAsync
        builder.addCase(fetchDamagesAsync.pending, (state) => {
            state.status = 'loading';
            state.damagesLoaded = false;
        });
        builder.addCase(fetchDamagesAsync.fulfilled, (state, action) => {
            state.damages = action.payload;
            state.damagesLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchDamagesAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch damages';
        });

        // Handle fetchReportsAsync
        builder.addCase(fetchReportsAsync.pending, (state) => {
            state.status = 'loading';
            state.reportsLoaded = false;
        });
        builder.addCase(fetchReportsAsync.fulfilled, (state, action) => {
            state.reports = action.payload;
            state.reportsLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchReportsAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch reports';
        });

        // Handle individual facility fetch
        builder.addCase(fetchFacilityAsync.fulfilled, (state, action) => {
            state.facilities = [...state.facilities, action.payload];
            state.status = 'idle';
        });

        // Handle individual pollution fetch
        builder.addCase(fetchPollutionAsync.fulfilled, (state, action) => {
            state.pollutions = [...state.pollutions, action.payload];
            state.status = 'idle';
        });

        // Handle individual report fetch
        builder.addCase(fetchReportsByNameAsync.fulfilled, (state, action) => {
            state.reports = [...state.reports, action.payload];
            state.status = 'idle';
        });

        // Handle individual report sorted fetch
        builder.addCase(fetchSortedReportsAsync.fulfilled, (state, action) => {
            state.reports = [...state.reports, action.payload];
            state.status = 'idle';
        });

        // Handle updatePollutionAsync
        builder.addCase(updatePollutionAsync.fulfilled, (state, action) => {
            const updatedPollutionIndex = state.pollutions.findIndex(p => p.id === action.payload.id);
            if (updatedPollutionIndex !== -1) {
                state.pollutions[updatedPollutionIndex] = action.payload;
            }
            state.status = 'idle';
        });

        // Handle updateFacilityAsync
        builder.addCase(updateFacilityAsync.fulfilled, (state, action) => {
            const updatedFacilityIndex = state.facilities.findIndex(f => f.id === action.payload.id);
            if (updatedFacilityIndex !== -1) {
                state.facilities[updatedFacilityIndex] = action.payload;
            }
            state.status = 'idle';
        });

        // Handle updateReportAsync
        builder.addCase(updateReportAsync.fulfilled, (state, action) => {
            const updatedReportIndex = state.reports.findIndex(r => r.id === action.payload.id);
            if (updatedReportIndex !== -1) {
                state.reports[updatedReportIndex] = action.payload;
            }
            state.status = 'idle';
        });

        // Handle deletePollutionAsync
        builder.addCase(deletePollutionAsync.fulfilled, (state, action) => {
            state.pollutions = state.pollutions.filter(p => p.id !== action.meta.arg);
            state.status = 'idle';
        });

        // Handle deleteFacilityAsync
        builder.addCase(deleteFacilityAsync.fulfilled, (state, action) => {
            state.facilities = state.facilities.filter(p => p.id !== action.meta.arg);
            state.status = 'idle';
        });

        // Handle deleteRiskAsync
        builder.addCase(deleteRiskAsync.fulfilled, (state, action) => {
            state.risks = state.risks.filter(p => p.id !== action.meta.arg);
            state.status = 'idle';
        });

        // Handle deletDamageAsync
        builder.addCase(deleteDamageAsync.fulfilled, (state, action) => {
            state.damages = state.damages.filter(p => p.id !== action.meta.arg);
            state.status = 'idle';
        });

        // Handle deleteReportAsync
        builder.addCase(deleteReportAsync.fulfilled, (state, action) => {
            state.reports = state.reports.filter(p => p.id !== action.meta.arg);
            state.status = 'idle';
        });

        // Handle addPollutionAsync
        builder.addCase(addPollutionAsync.pending, (state, action) => {
            if (action.payload) {
                state.pollutions = action.payload;
            }
            state.status = 'loading';
            state.pollutionsLoaded = false;
        });
        builder.addCase(addPollutionAsync.fulfilled, (state) => {
            state.pollutionsLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(addPollutionAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch facilities with pollution';
        });

        // Handle addRiskAsync
        builder.addCase(addRiskAsync.pending, (state, action) => {
            if (action.payload) {
                state.pollutions = action.payload;
            }
            state.status = 'loading';
            state.risksLoaded = false;
        });
        builder.addCase(addRiskAsync.fulfilled, (state) => {
            state.risksLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(addRiskAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch risk';
        });

        // Handle addDamageAsync
        builder.addCase(addDamageAsync.pending, (state, action) => {
            if (action.payload) {
                state.damages = action.payload;
            }
            state.status = 'loading';
            state.damagesLoaded = false;
        });
        builder.addCase(addDamageAsync.fulfilled, (state) => {
            state.damagesLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(addDamageAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch damage';
        });

        // Handle addFacilityAsync
        builder.addCase(addFacilityAsync.pending, (state, action) => {
            if (action.payload) {
                state.pollutions = action.payload;
            }
            state.status = 'loading';
            state.facilitiesLoaded = false;
        });
        builder.addCase(addFacilityAsync.fulfilled, (state) => {
            state.facilitiesLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(addFacilityAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch facilities';
        });

        // Handle addReportAsync
        builder.addCase(addReportAsync.pending, (state, action) => {
            if (action.payload) {
                state.pollutions = action.payload;
            }
            state.status = 'loading';
            state.reportsLoaded = false;
        });
        builder.addCase(addReportAsync.fulfilled, (state) => {
            state.reportsLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(addReportAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch reports';
        });

    },
});

export default pollutionSlice.reducer;
