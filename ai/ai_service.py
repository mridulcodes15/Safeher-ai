import os

from ai.ocr.ocr import OCRReader
from ai.speech_to_text.speech import SpeechToText
from ai.evidence_summary.summary import EvidenceSummarizer
from ai.timeline.timeline import TimelineGenerator
from ai.risk_assessment.risk import RiskAssessment
from ai.report_generation.report import ReportGenerator


class AIService:
    def __init__(self):
        print("Initializing AI Modules...")

        self.ocr = OCRReader()
        self.stt = SpeechToText()

        self.summary = EvidenceSummarizer()
        self.timeline = TimelineGenerator()
        self.risk = RiskAssessment()
        self.report = ReportGenerator()

        print("All AI Modules Loaded Successfully!")

    def analyze_case(self, image_path=None, audio_path=None):
        """
        Complete AI Pipeline

        image_path -> OCR
        audio_path -> Speech-to-Text

        Returns dictionary containing every AI output.
        """

        ocr_text = ""
        speech_text = ""

        # OCR
        if image_path and os.path.exists(image_path):
            print("Running OCR...")
            ocr_text = self.ocr.extract_text(image_path)

        # Speech
        if audio_path and os.path.exists(audio_path):
            print("Running Speech-To-Text...")
            speech_text = self.stt.transcribe(audio_path)

        # Combine evidence
        evidence = ""

        if ocr_text:
            evidence += "OCR Evidence:\n"
            evidence += ocr_text
            evidence += "\n\n"

        if speech_text:
            evidence += "Speech Transcript:\n"
            evidence += speech_text

        if evidence.strip() == "":
            raise Exception("No evidence provided.")

        print("Generating Summary...")
        summary = self.summary.summarize(evidence)

        print("Generating Timeline...")
        timeline = self.timeline.generate(evidence)

        print("Assessing Risk...")
        risk = self.risk.assess(evidence)

        print("Generating Final Report...")
        report = self.report.generate_report(
            ocr_text=ocr_text,
            speech_text=speech_text,
            summary=summary,
            risk=risk,
            timeline=timeline
        )

        return {
            "ocr": ocr_text,
            "speech": speech_text,
            "summary": summary,
            "timeline": timeline,
            "risk": risk,
            "report": report
        }
