from contextlib import asynccontextmanager
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from database.firebase import initialize_firebase
from routes import auth, report, upload, ai, pdf, health

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan events handler for the FastAPI application.
    Initializes external services (like Firebase Admin SDK) on startup.
    """
    # Initialize Firebase Admin SDK
    initialize_firebase()
    yield
    # Any cleanup actions can go here

# Initialize FastAPI application with lifespan handler
app = FastAPI(
    title="SafeHer Backend",
    description="Backend API for the SafeHer safety application, integrating Firebase, Gemini AI, and ReportLab PDF generation.",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS Middleware for development
# Allow all origins, methods, and headers so that Flutter (mobile/web) frontends can connect seamlessly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers under api v1 (registered directly for now)
app.include_router(auth.router)
app.include_router(report.router)
app.include_router(upload.router)
app.include_router(ai.router)
app.include_router(pdf.router)
app.include_router(health.router)

@app.get("/")
async def root():
    """
    Welcome endpoint returning API status message.
    """
    return {
        "message": "Welcome to SafeHer Backend"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
