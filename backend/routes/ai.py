import os
import uuid

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.concurrency import run_in_threadpool

from ai.ai_service import AIService

router = APIRouter(
    prefix="/ai",
    tags=["AI / Gemini"]
)

# Load AI service once
ai_service = AIService()

UPLOAD_DIR = "backend/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/analyze")
async def analyze_incident(
    image: UploadFile = File(None),
    audio: UploadFile = File(None)
):
    """
    Upload an image and/or audio file for AI analysis.
    """

    if image is None and audio is None:
        raise HTTPException(
            status_code=400,
            detail="Please upload at least one image or audio file."
        )

    image_path = None
    audio_path = None

    try:
        # Save uploaded image
        if image:
            image_path = os.path.join(
                UPLOAD_DIR,
                f"{uuid.uuid4()}_{image.filename}"
            )

            with open(image_path, "wb") as f:
                f.write(await image.read())

        # Save uploaded audio
        if audio:
            audio_path = os.path.join(
                UPLOAD_DIR,
                f"{uuid.uuid4()}_{audio.filename}"
            )

            with open(audio_path, "wb") as f:
                f.write(await audio.read())

        # Run AI pipeline
        result = await run_in_threadpool(
            ai_service.analyze_case,
            image_path,
            audio_path
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post("/suggest-precautions")
async def suggest_precautions():
    """
    Placeholder endpoint.
    """
    return {
        "message": "AI precaution suggestions endpoint placeholder"
    }