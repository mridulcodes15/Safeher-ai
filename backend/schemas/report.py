from pydantic import BaseModel, Field
from datetime import datetime, date, time
from typing import List, Optional


class ReportBase(BaseModel):
    description: str

    user_id: Optional[str] = None
    incident_date: Optional[date] = None
    incident_time: Optional[time] = None
    location: Optional[str] = None
    incident_type: Optional[str] = None

    people_involved: List[str] = Field(default_factory=list)
    evidence_files: List[str] = Field(default_factory=list)


class ReportCreate(ReportBase):
    pass


class Report(ReportBase):
    report_id: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }