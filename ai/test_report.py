from report_generation.report import ReportGenerator

report = ReportGenerator()

ocr_text = """
WhatsApp Screenshot:
Pay ₹20,000 or your private photos will be uploaded.
"""

speech_text = """
The victim stated that she received multiple threatening calls and is afraid to leave her home.
"""

summary = """
The victim was blackmailed with private photographs and received repeated threats demanding money.
"""

risk = """
Risk Level: Critical

Reason:
The attacker threatened to leak private photos and claimed to know the victim's location.

Recommended Action:
Immediate police intervention is advised.
"""

timeline = """
8:05 PM - Threatening message received.

8:10 PM - Money demanded.

8:15 PM - Threat to leak photos.

8:20 PM - Victim contacted SafeHer.
"""

result = report.generate_report(
    ocr_text,
    speech_text,
    summary,
    risk,
    timeline
)

print("\n===== INCIDENT REPORT =====\n")
print(result)