from ai.config import client

response = client.models.generate_content(
    model="gemini-flash-latest",
    contents="Say Hello from SafeHer AI"
)

print(response.text)