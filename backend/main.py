from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import List
from database import Base
from fastapi.middleware.cors import CORSMiddleware
from endpoints import customer, teaching_staff,student


from models.customer import Customer
from models.teaching_staff import TeachingStaff
from schemas.customer import CustomerCreate, CustomerOut, CustomerWithTeaching, LoginRequest, LoginResponse 
from schemas.teaching_staff import TeachingStaffCreate, TeachingStaffOut

# ------------------ Database Setup ------------------
DATABASE_URL = "sqlite:///university.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

# ------------------ FastAPI Setup ------------------
app = FastAPI(
    title="Smart Attendance Management System API",
    description="Manage Customers and Teaching Staff details",
    version="1.0.0"
)

# Allow your frontend origin here
origins = [
    "http://localhost:3000",  # React dev server
    # add production URLs if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,              # Allow specific origins
    allow_credentials=True,
    allow_methods=["*"],                # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],                # Allow all headers
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.include_router(customer.router)
app.include_router(teaching_staff.router)
app.include_router(student.router) 