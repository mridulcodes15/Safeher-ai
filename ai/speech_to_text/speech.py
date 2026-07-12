import os
import whisper


class SpeechToText:
    def __init__(self, model_name: str = "base"):
        """
        Supported models:
        tiny, base, small, medium, large
        """
        print(f"Loading Whisper model: {model_name}...")
        self.model = whisper.load_model(model_name)
        print("Whisper model loaded successfully!")

    def transcribe(self, audio_path: str) -> str:
        """
        Convert an audio file to text.

        Args:
            audio_path (str): Path to the audio file.

        Returns:
            str: Transcribed text.
        """

        if not os.path.exists(audio_path):
            raise FileNotFoundError(f"File not found: {audio_path}")

        result = self.model.transcribe(audio_path)

        return result["text"].strip()