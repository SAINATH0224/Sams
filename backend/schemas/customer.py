from pydantic import BaseModel
from datetime import date
from typing import Optional
from schemas.teaching_staff import TeachingStaffOut
from models.customer import UserType
class LoginRequest(BaseModel):
    user_name: str
    password: str

class CustomerCreate(BaseModel):
    Firstname: str
    Lastname: str
    Phonenumber: str
    Gender: str
    MailID: str
    DOB: date
    CustomerType: UserType
    Password: str
    

class LoginResponse(BaseModel):
    ID: int
    Firstname: str
    Lastname: str
    Phonenumber: str
    Gender: str
    MailID: str
    DOB: date
    customer_type: UserType
    

class CustomerOut(CustomerCreate):
    ID: int
    class Config:
        orm_mode = True

class CustomerWithTeaching(BaseModel):
    ID: int
    Firstname: str
    Lastname: str
    Phonenumber: str
    Gender: str
    MailID: str
    DOB: date
    teaching_info: Optional[TeachingStaffOut]

    class Config:
        orm_mode = True
