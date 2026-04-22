from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import interview, evaluation
from app.routes import auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interview.router)
app.include_router(evaluation.router)
app.include_router(auth.router)