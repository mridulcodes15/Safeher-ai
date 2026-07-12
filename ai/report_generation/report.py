from ai.config import client


class ReportGenerator:
    def __init__(self):
        self.client = client

    def generate_report(
        self,
        ocr_text: str,
        speech_text: str,
        summary: str,
        risk: str,
        timeline: str,
    ) -> str:

        prompt = f"""
You are an AI Incident Report Generator for the SafeHer platform.

Create a professional incident report using the following information.

OCR Evidence:
{ocr_text}

Speech Transcript:
{speech_text}

Evidence Summary:
{summary}

Risk Assessment:
{risk}

Timeline:
{timeline}

Generate the report in this format:

==============================
SAFEHER INCIDENT REPORT
==============================

1. Incident Overview

2. Evidence Summary

3. Speech Transcript

4. OCR Findings

5. Timeline of Events

6. Risk Assessment

7. Recommended Actions

Keep the report professional, concise, and suitable for police or legal authorities.
"""

        response = self.client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )

        return response.text.strip()