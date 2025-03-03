import { Launchpad } from "../../types/launchpads";
import { apiClient } from "../client";

export const LaunchpadService = {
  getAll: async() : Promise<Launchpad[]> => {
    const response = await apiClient.get('/launchpads');
    return response.data;
  }
}
