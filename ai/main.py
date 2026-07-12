from ai.ai_service import AIService

IMAGE_PATH = "sample_image.png"
AUDIO_PATH = "sample_audio.mp4"


def main():
    ai = AIService()

    result = ai.analyze_case(
        image_path=IMAGE_PATH,
        audio_path=AUDIO_PATH
    )

    print("\n========== OCR ==========\n")
    print(result["ocr"])

    print("\n========== SPEECH ==========\n")
    print(result["speech"])

    print("\n========== SUMMARY ==========\n")
    print(result["summary"])

    print("\n========== TIMELINE ==========\n")
    print(result["timeline"])

    print("\n========== RISK ==========\n")
    print(result["risk"])

    print("\n========== REPORT ==========\n")
    print(result["report"])


if __name__ == "__main__":
    main()