import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import azureData from "@/lib/ExpData/azureExplorer.json";
import awsData from "@/lib/ExpData/awsExplorer.json";
import gcpData from "@/lib/ExpData/gcpExplorer.json";

export const explorerProvider = {
    AWS: "aws",
    AZURE: "azure",
    GCP: "gcp",
};

export const fetchProviderData = createAsyncThunk(
    "explorerData/fetchProviderData",
    async (provider) => {
        switch (provider) {
            case explorerProvider.AZURE:
                return { data: azureData.Data, provider: "azure" };
            case explorerProvider.AWS:
                return { data: awsData.Data, provider: "aws" };
            case explorerProvider.GCP:
                return { data: gcpData.Data, provider: "gcp" };
            default:
                return { data: [], provider: null };
        }
    }
);

const initialState = {
    data: [],
    explorerProvider: null,
    selectedRegion: null,
    regions: [],
};

const ExplorerSlice = createSlice({
    name: "explorerData",
    initialState,
    reducers: {
        setProvider: (state, action) => {

            switch (action.payload) {
                case explorerProvider.AZURE:
                    state.regions = [... new Set(azureData.Data.map(item => item.region))];
                    break;
                case explorerProvider.AWS:
                    state.regions = [... new Set(awsData.Data.map(item => item.region))];
                    break;

                case explorerProvider.GCP:
                    state.regions = [... new Set(gcpData.Data.map(item => item.region))];
                    break;


            }
        },
        setExplorerProvider(state, action) {
            state.explorerProvider = action.payload;
            state.selectedRegion = null; // reset region when provider changes
        },
        setRegion(state, action) {
            state.selectedRegion = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProviderData.fulfilled, (state, action) => {
            const payloadData = Array.isArray(action.payload.data)
                ? action.payload.data
                : [];

            state.explorerProvider = action.payload.provider;

            // Set default region if not already selected
            if (!state.selectedRegion && payloadData.length > 0) {
                state.selectedRegion = payloadData[0].region;
            }

            // Filter data by selected region
            state.data = payloadData.filter(
                (item) => item.region === state.selectedRegion
            );
        });
    },
});

export const { setExplorerProvider, setRegion, setProvider } = ExplorerSlice.actions;
export default ExplorerSlice.reducer;
