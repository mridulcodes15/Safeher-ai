from speech_to_text.speech import SpeechToText

stt = SpeechToText("small")

audio_file = "sample_audio.mp4"

text = stt.transcribe(audio_file)

print("\n===== TRANSCRIPTION =====\n")
print(text)