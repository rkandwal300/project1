export const selectTelemetryState = (state) => state.telemetry;

export const selectTelemetryData = (state) => state.telemetry.data;

export const selectTelemetryType = (state) => state.telemetry.type;

export const selectTelemetryConnectionStatus = (state) =>
  state.telemetry.connectionStatus;

export const selectTelemetryLoading = (state) => state.telemetry.loading;

export const selectTelemetryError = (state) => state.telemetry.error;

export const selectTelemetryResetFlag = (state) => state.telemetry.reset;
