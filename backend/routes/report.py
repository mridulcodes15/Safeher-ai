import uuid
from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter, HTTPException, status
from backend.schemas.report import Report, ReportCreate

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

# In-memory database to store reports temporarily
REPORTS_DB: dict[str, dict] = {}

@router.post("/", response_model=Report, status_code=status.HTTP_201_CREATED)
async def create_report(report_data: ReportCreate):
    """
    Submit a new safety incident report.

    This endpoint validates the input data against the ReportCreate schema,
    generates a unique `report_id` and a `created_at` timestamp, stores the
    report in the in-memory database, and returns the newly created report.
    """
    report_id = f"rep_{uuid.uuid4()}"
    created_at = datetime.now(timezone.utc)
    
    # Construct the stored report dictionary matching the Report schema
    new_report_dict = report_data.model_dump(exclude_none=True)
    new_report_dict.update({
        "report_id": report_id,
        "created_at": created_at
    })
    
    REPORTS_DB[report_id] = new_report_dict
    return new_report_dict

@router.get("/", response_model=List[Report])
async def get_reports():
    """
    Retrieve all safety incident reports.

    This endpoint returns a list of all incident reports currently stored in-memory.
    """
    return list(REPORTS_DB.values())

@router.get("/{report_id}", response_model=Report)
async def get_report_by_id(report_id: str):
    """
    Retrieve a specific incident report by its unique ID.

    If the report is found in the in-memory database, it is returned.
    Otherwise, an HTTP 404 (Not Found) exception is raised with an error message.
    """
    report = REPORTS_DB.get(report_id)
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Report with ID '{report_id}' was not found."
        )
    return report
