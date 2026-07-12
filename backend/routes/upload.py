from fastapi import APIRouter, UploadFile, File, status

router = APIRouter(
    prefix="/upload",
    tags=["Uploads"]
)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def upload_file(file: UploadFile = File(...)):
    """
    Placeholder endpoint to upload file/media to backend or storage.
    """
    return {
        "message": "File upload endpoint placeholder",
        "filename": file.filename,
        "content_type": file.content_type
    }
