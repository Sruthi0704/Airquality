import api from "./api";

export const getMetrics = async () => {
  const response = await api.get("/metrics");
  return response.data;
};

export const getFeatureImportance = async () => {
  const response = await api.get("/feature-importance");
  return response.data;
};

export const getDatasetInfo = async () => {
  const response = await api.get("/dataset-info");
  return response.data;
};