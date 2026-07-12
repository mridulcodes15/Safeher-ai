from risk_assessment.risk import RiskAssessment

risk = RiskAssessment()

sample_text = """
A woman has received repeated threatening messages.
The sender demands ₹20,000 and threatens to leak her private photographs.
The victim is afraid to leave her home because the sender claims to know where she lives.
"""

result = risk.assess(sample_text)

print("\n===== RISK ASSESSMENT =====\n")
print(result)