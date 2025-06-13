import { instanceList, providerList } from "@/lib/instanceList";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInstanceType = createAsyncThunk(
  "provider/fetchInstanceType",
  async () => instanceList
);

const initialState = {
  type: null,
  name: null,
  region: null,
  telemetryCloud: null,
  providerList: providerList,
  regions: [],
  instanceTypes: [],
  pricingModels: ["ondemand", "reserved", "spot"],
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProvider(state, action) {
      state.type = action.payload.type;
      if ( action .payload.type === "telemetry") {
     
        state.telemetryCloud = 'AWS';
      }
      state.name = action.payload.name;
      const filteredProviders = instanceList.filter(
        (provider) =>
          provider.type === action.payload.type &&
          provider.name === action.payload.name
      );
      state.regions = [
        ...new Set(
          filteredProviders.flatMap((provider) => provider.region || [])
        ),
      ];
    },
    setTelemetryCloud:(state, action) => {
      state.telemetryCloud = action.payload;
       
    },
    setRegion(state, action) {
      state.region = action.payload;
      const filteredProviders = instanceList.filter(
        (provider) => provider.name === state.name
      );
      state.instanceTypes = [
        ...new Set(
          filteredProviders.flatMap((provider) =>
            provider.region == action.payload ? provider.instanceType : []
          )
        ),
      ];     
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInstanceType.fulfilled, (state, action) => {
      const data = action.payload;

      if (!state.type || !state.name) {
        state.type = data[0]?.type || null;
        state.name = data[0]?.name || null;
      }

      const filteredProviders = data.filter(
        (provider) =>
          provider.type === state.type && provider.name === state.name
      );

      state.regions = [
        ...new Set(
          filteredProviders.flatMap((provider) => provider.region || [])
        ),
      ];
    });
  },
});

export const { setProvider, setRegion ,setTelemetryCloud} = providerSlice.actions;
export default providerSlice.reducer;
