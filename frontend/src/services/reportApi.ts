import API_BASE_URL from "./api";

export interface ReportPayload {
  description: string;
  user_id?: string;
  incident_date?: string;
  incident_time?: string;
  location?: string;
  incident_type?: string;
  people_involved?: string[];
  evidence_files?: string[];
}

export async function createReport(payload: ReportPayload) {
  const response = await fetch(`${API_BASE_URL}/reports/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
}

export async function getReports() {
  const response = await fetch(`${API_BASE_URL}/reports/`);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
}