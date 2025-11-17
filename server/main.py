from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@app.get("/breed-info")
async def breed_info(type: str, name: str, age: str):

    prompt = f"""
        Don't write any extra things keep it short and keep it according to the way that adopters  can clearly undersatnd about the pet without confusion.
        Create a clean, bullet-point description for the following pet:

        Pet Name: {name}
        Breed/Type: {type}
        Age: {age}

        Include:
        - Temperament
        - Behavior
        - Grooming needs
        - Ideal home environment
        - Special notes based on age
        """

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        return {"info": response.text}
    except Exception as e:
        print("GEMINI ERROR:", e)
        return {"info": f"ERROR: {str(e)}"}
