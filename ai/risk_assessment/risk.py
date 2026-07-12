from config import client


class RiskAssessment:
    def __init__(self):
        self.client = client

    def assess(self, evidence_text: str) -> str:
        prompt = f"""
You are an AI risk assessment system for the SafeHer platform.

Analyze the following evidence and determine the victim's risk level.

Evidence:
{evidence_text}

Return your answer in this format:

Risk Level: Low / Medium / High / Critical

Reason:
(Explain why)

Recommended Action:
(What should authorities or the victim do immediately?)
"""

        response = self.client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )

        return response.text.strip()