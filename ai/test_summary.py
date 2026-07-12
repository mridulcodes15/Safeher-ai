from ai.evidence_summary.summary import EvidenceSummarizer

summarizer = EvidenceSummarizer()

sample_text = """
On 12 July at around 9:00 PM, the victim received multiple threatening WhatsApp messages.
The sender demanded ₹20,000 and threatened to leak the victim's personal photographs on social media if the payment was not made within 24 hours.
The victim reported feeling unsafe and feared further harassment.
"""

summary = summarizer.summarize(sample_text)

print("\n===== SUMMARY =====\n")
print(summary)