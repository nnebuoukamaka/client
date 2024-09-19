import { api } from "./baseApi";

export const createAgency = (agencyData) => api.post('api/agencies/createAgency', agencyData);
