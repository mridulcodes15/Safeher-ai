from ai.config import client


class TimelineGenerator:
    def __init__(self):
        self.client = client

    def generate(self, evidence_text: str) -> str:
        prompt = f"""
You are an AI assistant for the SafeHer platform.

Analyze the following evidence and generate a chronological timeline.

Evidence:
{evidence_text}

Return only the timeline.

Format:

Time/Event
------------
- Time : Event
- Time : Event
- Time : Event

If no exact time is available, estimate using the sequence of events.
"""

        response = self.client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )

        return response.text.strip()