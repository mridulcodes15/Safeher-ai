from fastapi import APIRouter
from database.firebase import check_firebase_connection

router = APIRouter(
    tags=["System Health"]
)

@router.get("/health")
async def health_check():
    """
    Get backend status and integration connectivity.
    
    Returns 'running' for API status and whether Firebase is 'connected' or 'disconnected'.
    """
    firebase_status = "connected" if check_firebase_connection() else "disconnected"
    return {
        "status": "running",
        "firebase": firebase_status
    }
