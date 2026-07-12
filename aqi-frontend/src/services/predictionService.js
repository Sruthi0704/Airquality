import api from "./api";

export const predictAQI = async (data) => {
    const response = await api.post("/predict", data);
    return response.data;
};