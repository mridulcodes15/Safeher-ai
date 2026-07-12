from timeline.timeline import TimelineGenerator

timeline = TimelineGenerator()

sample = """
8:05 PM - Victim received a threatening WhatsApp message.

8:08 PM - Attacker demanded ₹20,000.

8:12 PM - Victim refused to pay.

8:15 PM - Attacker threatened to leak personal photos.

8:20 PM - Victim contacted SafeHer.
"""

result = timeline.generate(sample)

print("\n===== TIMELINE =====\n")
print(result)