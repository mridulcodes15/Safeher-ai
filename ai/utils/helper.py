from config import client


def ask_gemini(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt
    )

    return response.text