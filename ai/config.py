import os
from dotenv import load_dotenv
from google import genai

# Project root (Safeher-AI/)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load backend/.env
load_dotenv(os.path.join(PROJECT_ROOT, "backend", ".env"))

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in backend/.env")

client = genai.Client(api_key=API_KEY)