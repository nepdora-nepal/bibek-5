import { DashboardStats } from "@/types/dashboard";
import { siteConfig } from "@/config/site";
import { createHeaders } from "@/utils/headers";
import { handleApiError } from "@/utils/api-error";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const API_BASE_URL = siteConfig.apiBaseUrl;
  const response = await fetch(`${API_BASE_URL}/api/dashboard-stats/`, {
    method: "GET",
    headers: createHeaders(),
  });
  await handleApiError(response);
  return response.json();
};
