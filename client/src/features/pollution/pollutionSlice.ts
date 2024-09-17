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
            thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchFacilitiesAsync = createAsyncThunk<IndustrialFacilityDto[]>(
    "pollution/fetchFacilitiesAsync",
    async (_, thunkAPI) => {
        try {
            return agent.Facilities.getFacilities();
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchFacilityAsync = createAsyncThunk<IndustrialFacilityDto, number>(
    "pollution/fetchFacilityAsync",
    async (id, thunkAPI) => {
        try {
            return agent.Facilities.getFacility(id);
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);


export const fetchPollutionsAsync = createAsyncThunk<PollutionDto[]>(
    "pollution/fetchPollutionsAsync",
    async (_, thunkAPI) => {
        try {
            return agent.Pollution.getPollutions();
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchPollutionAsync = createAsyncThunk<PollutionDto, number>(
    "pollution/fetchPollutionAsync",
    async (id, thunkAPI) => {
        try {
            return agent.Pollution.getPollution(id);
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
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
    },
});