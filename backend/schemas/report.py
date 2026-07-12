from pydantic import BaseModel, Field
from datetime import datetime, date, time
from typing import List

class ReportBase(BaseModel):
    user_id: str = Field(..., description="ID of the user filing the report", example="usr_983742")
    incident_date: date = Field(..., description="Date of the incident (YYYY-MM-DD)", example="2026-07-12")
    incident_time: time = Field(..., description="Time of the incident (HH:MM:SS)", example="17:45:00")
    location: str = Field(..., description="Location where the incident occurred", example="123 Main St, New York, NY")
    incident_type: str = Field(..., description="Type of incident (e.g. harassment, theft, safety hazard)", example="Harassment")
    description: str = Field(..., description="Detailed description of what happened", example="A suspicious individual was following me near the subway entrance.")
    people_involved: List[str] = Field(default=[], description="Names or descriptions of other people involved or witnesses", example=["Suspicious person", "Jane Doe"])
    evidence_files: List[str] = Field(default=[], description="List of file paths or URLs for evidence (images, audio, video)", example=["uploads/evidence_01.jpg"])

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    report_id: str = Field(..., description="Unique report identifier", example="rep_a8f9c0e2-72c1-4b36-a859")
    created_at: datetime = Field(..., description="Timestamp of when the report was created", example="2026-07-12T17:49:56Z")

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "report_id": "rep_550e8400-e29b-41d4-a716-446655440000",
                "user_id": "usr_983742",
                "incident_date": "2026-07-12",
                "incident_time": "17:45:00",
                "location": "123 Main St, New York, NY",
                "incident_type": "Harassment",
                "description": "A suspicious individual was following me near the subway entrance.",
                "people_involved": ["Suspicious person", "Jane Doe"],
                "evidence_files": ["uploads/evidence_01.jpg"],
                "created_at": "2026-07-12T17:49:56.123456"
            }
        }
