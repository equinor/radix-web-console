export const getLogsStatus = (state) => state.jobLog.status;
export const getLogsError = (state) => state.jobLog.lastError;
export const getLogs = (state) => state.jobLog.payload;
