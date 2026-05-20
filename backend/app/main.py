from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.routes import (
    auth,
    interview,
    evaluation,
    dashboard
)

app = FastAPI()


# CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# Routes
app.include_router(auth.router)

app.include_router(interview.router)

app.include_router(evaluation.router)

app.include_router(dashboard.router)