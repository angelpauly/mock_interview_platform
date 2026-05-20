from fastapi import APIRouter, HTTPException

from app.models.schemas import (
    UserSignup,
    UserLogin
)

from app.services.auth_service import (
    hash_password,
    verify_password,
    create_token
)

from app.core.database import users_collection

router = APIRouter()


# ✅ SIGNUP
@router.post("/signup")
def signup(user: UserSignup):

    # Check if user already exists
    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    # Hash password
    hashed = hash_password(user.password)

    # Save user in MongoDB
    users_collection.insert_one({
        "email": user.email,
        "password": hashed
    })

    return {
        "message": "User created successfully"
    }


# ✅ LOGIN
@router.post("/login")
def login(user: UserLogin):

    # Find user in MongoDB
    db_user = users_collection.find_one({
        "email": user.email
    })

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Verify password
    if not verify_password(
        user.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    # Create JWT token
    token = create_token({
        "sub": user.email
    })

    return {
        "access_token": token
    }