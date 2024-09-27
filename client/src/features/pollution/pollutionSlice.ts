import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FullIndustrialFacilityDto, IndustrialFacilityDto } from "../../app/models/Facility";
import agent from "../../app/api/agent";
import { PollutionDto } from "../../app/models/Pollution";

export const fetchFacilitiesWithPollutionAsync = createAsyncThunk<FullIndustrialFacilityDto[]>(
    "pollution/fetchFacilitiesWithPollutionAsync",
    async (_, thunkAPI) => {
        try {
            return agent.Facilities.getFacilitiesWithPollution();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchFacilitiesAsync = createAsyncThunk<IndustrialFacilityDto[]>(
    "pollution/fetchFacilitiesAsync",
    async (_, thunkAPI) => {
        try {
            return agent.Facilities.getFacilities();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchFacilityAsync = createAsyncThunk<IndustrialFacilityDto, number>(
    "pollution/fetchFacilityAsync",
    async (id, thunkAPI) => {
        try {
            return agent.Facilities.getFacility(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchPollutionsAsync = createAsyncThunk<PollutionDto[]>(
    "pollution/fetchPollutionsAsync",
    async (_, thunkAPI) => {
        try {
            return agent.Pollution.getPollutions();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchPollutionAsync = createAsyncThunk<PollutionDto, number>(
    "pollution/fetchPollutionAsync",
    async (id, thunkAPI) => {
        try {
            return agent.Pollution.getPollution(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const updatePollutionAsync = createAsyncThunk<PollutionDto, PollutionDto>(
    "pollution/updatePollutionAsync",
    async (pollution, thunkAPI) => {
        try {
            return agent.Pollution.putPollution(pollution.id, pollution);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const deletePollutionAsync = createAsyncThunk<void, number>(
    "pollution/deletePollutionAsync",
    async (pollutionId, thunkAPI) => {
        try {
            await agent.Pollution.delPollution(pollutionId);
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
        fullFacilities: [] as FullIndustrialFacilityDto[],
        pollutionsLoaded: false,
        facilitiesLoaded: false,
        pollutionsWithFacilitiesLoaded: false,
        status: 'idle',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle fetchFacilitiesWithPollutionAsync
        builder.addCase(fetchFacilitiesWithPollutionAsync.pending, (state) => {
            state.status = 'loading';
            state.pollutionsWithFacilitiesLoaded = false;
        });
        builder.addCase(fetchFacilitiesWithPollutionAsync.fulfilled, (state, action) => {
            state.fullFacilities = action.payload;
            state.pollutionsWithFacilitiesLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFacilitiesWithPollutionAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch facilities with pollution';
        });

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

        // Handle updatePollutionAsync
        builder.addCase(updatePollutionAsync.fulfilled, (state, action) => {
            const updatedPollutionIndex = state.pollutions.findIndex(p => p.id === action.payload.id);
            if (updatedPollutionIndex !== -1) {
                state.pollutions[updatedPollutionIndex] = action.payload;
            }
            state.status = 'idle';
        });

        // Handle deletePollutionAsync
        builder.addCase(deletePollutionAsync.fulfilled, (state, action) => {
            state.pollutions = state.pollutions.filter(p => p.id !== action.meta.arg);
            state.status = 'idle';
        });
    },
});

export default pollutionSlice.reducer;
