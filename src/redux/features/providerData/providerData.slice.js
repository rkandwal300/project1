import { instanceList, providerList } from "@/lib/instanceList";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CLOUD_TYPES } from "../telemetry/telemetry.slice";
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
      let { type = "cloud", name = CLOUD_TYPES.AWS } = action.payload;
      state.type = type;
      state.name = name;

      let filteredProviders = [];

      if (type === "telemetry") {
        console.log({type})
        const validTelemetryClouds = state.providerList
          .filter((provider) => provider.type === "telemetry")
          .map((provider) => provider.cloud);

        if (validTelemetryClouds.includes(name)) {
          state.telemetryCloud = name;
        } else {
          state.telemetryCloud = validTelemetryClouds[0] || null;
          name = state.telemetryCloud;
        }

        filteredProviders = instanceList.filter(
          (provider) =>
            provider.type === "telemetry" &&
            provider.cloud === name 
        );
      } else {
        state.telemetryCloud = null;
        filteredProviders = instanceList.filter(
          (provider) =>
            provider.type === type &&
            provider.name &&
            provider.name.toLowerCase() === name?.toLowerCase()
        );
      }

      state.regions = [
        ...new Set(
          filteredProviders.flatMap((provider) => provider.region || [])
        ),
      ];
    },
    setTelemetryCloud: (state, action) => {
      state.telemetryCloud = action.payload;
      const filteredProviders = instanceList.filter(
        (provider) =>
          provider.type === "telemetry" &&
          provider.cloud.toLowerCase() === action.payload.toLowerCase()
      );
      state.regions = [
        ...new Set(
          filteredProviders.flatMap((provider) => provider.region || [])
        ),
      ];
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

export const { setProvider, setRegion, setTelemetryCloud } =
  providerSlice.actions;
export default providerSlice.reducer;
