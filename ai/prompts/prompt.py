"""
Centralized Gemini prompts for SafeHer AI.
"""

SUMMARY_PROMPT = """
You are an AI assistant for SafeHer.

Summarize the following evidence.

Requirements:
- Keep it concise.
- Preserve important facts.
- Mention people, places and threats.
- Do not invent information.

Evidence:
{text}
"""

TIMELINE_PROMPT = """
You are an AI assistant.

Extract events from the evidence.

Return JSON in this format:

[
 {
   "time":"",
   "event":"",
   "description":""
 }
]

Evidence:
{text}
"""

RISK_PROMPT = """
You are a women's safety expert.

Analyze the evidence.

Return JSON only:

{
 "risk_level":"",
 "confidence":"",
 "reason":"",
 "recommended_action":""
}

Evidence:
{text}
"""

REPORT_PROMPT = """
Generate a professional incident report.

Include:
1. Summary
2. Timeline
3. Risk Assessment
4. Recommendations

Data:
{text}
"""