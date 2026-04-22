from fastapi import APIRouter, HTTPException
from app.models.schemas import UserSignup, UserLogin
from app.services.auth_service import (
    hash_password, verify_password, create_token, fake_users_db
)

router = APIRouter()

@router.post("/signup")
def signup(user: UserSignup):
    if user.email in fake_users_db:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = hash_password(user.password)

    fake_users_db[user.email] = {
        "email": user.email,
        "password": hashed
    }

    return {"message": "User created successfully"}


@router.post("/login")
def login(user: UserLogin):
    db_user = fake_users_db.get(user.email)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"sub": user.email})

    return {"access_token": token}