import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


class CodeRequest(BaseModel):
    code: str
    language: str = "c"


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "EmbedDebug AI Backend is running"
    }


@app.post("/analyze")
def analyze(request: CodeRequest):

    prompt = (
        "You are EmbedDebug AI, an expert C and Embedded C debugging assistant.\n\n"
        "Analyze the following code.\n\n"
        "Return:\n"
        "1. Detected issues\n"
        "2. Line number if possible\n"
        "3. Explanation\n"
        "4. Possible cause\n"
        "5. Suggested fix\n"
        "6. Improved corrected code\n\n"
        "Keep the explanation simple for a beginner.\n\n"
        "Language: " + request.language + "\n\n"
        "Code:\n" + request.code
    )

    response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents=prompt
)

    return {
        "status": "success",
        "analysis": response.text
    }