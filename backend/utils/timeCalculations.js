export const calculateTimeLapsed = (startTime, currentTime) => Math.max(0, (currentTime - startTime) / (1000 * 60 * 60));
export const calculateBalanceTime = (endTime, currentTime) => Math.max(0, (endTime - currentTime) / (1000 * 60 * 60));
export const calculateTotalTime = (startTime, endTime) => (endTime - startTime) / (1000 * 60 * 60);
