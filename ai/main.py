from speech_to_text.speech import SpeechToText
from ocr.ocr import OCRReader
from evidence_summary.summary import EvidenceSummarizer
from risk_assessment.risk import RiskAssessment
from timeline.timeline import TimelineGenerator
from report_generation.report import ReportGenerator


class SafeHerAI:
    def __init__(self):
        print("Initializing SafeHer AI...")

        self.stt = SpeechToText()
        self.ocr = OCRReader()
        self.summary = EvidenceSummarizer()
        self.risk = RiskAssessment()
        self.timeline = TimelineGenerator()
        self.report = ReportGenerator()

        print("SafeHer AI Ready!")

    def speech_to_text(self, audio_path):
        return self.stt.transcribe(audio_path)

    def extract_text(self, image_path):
        return self.ocr.extract_text(image_path)

    def summarize(self, text):
        return self.summary.summarize(text)

    def assess_risk(self, text):
        return self.risk.assess(text)

    def generate_timeline(self, text):
        return self.timeline.generate(text)

    def generate_report(self, ocr_text, speech_text, summary, risk, timeline):
        return self.report.generate_report(
            ocr_text,
            speech_text,
            summary,
            risk,
            timeline
        )


if __name__ == "__main__":
    ai = SafeHerAI()