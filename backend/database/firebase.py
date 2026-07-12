import os
import logging
import firebase_admin
from firebase_admin import credentials

# Configure logger to output via uvicorn
logger = logging.getLogger("uvicorn")

def initialize_firebase() -> firebase_admin.App | None:
    """
    Initializes the Firebase Admin SDK using variables loaded from the environment.
    
    Checks if Firebase has already been initialized, loads credentials from the
    path specified in `FIREBASE_CREDENTIALS_PATH`, and configures the Storage bucket.
    If credentials are missing or invalid, logs a warning and returns None.
    """
    # Avoid initializing multiple times
    if firebase_admin._apps:
        logger.info("Firebase Admin SDK is already initialized.")
        return firebase_admin.get_app()

    cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
    bucket = os.getenv("FIREBASE_STORAGE_BUCKET")

    if not cred_path:
        logger.warning("FIREBASE_CREDENTIALS_PATH is not set in environment variables. Firebase features will be disabled.")
        return None

    if not os.path.exists(cred_path):
        logger.warning(f"Firebase credentials file not found at '{cred_path}'. Firebase features will be disabled.")
        return None

    try:
        cred = credentials.Certificate(cred_path)
        options = {"storageBucket": bucket} if bucket else {}
        app = firebase_admin.initialize_app(cred, options)
        logger.info("Firebase Admin SDK initialized successfully.")
        return app
    except Exception as e:
        logger.error(f"Failed to initialize Firebase Admin SDK: {e}")
        return None

def check_firebase_connection() -> bool:
    """
    Checks whether the Firebase app has been initialized successfully.
    """
    return len(firebase_admin._apps) > 0
