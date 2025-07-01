from pydantic import BaseModel
from datetime import date
from typing import Optional

class CustomerCreate(BaseModel):
    Firstname: str
    Lastname: str
    Phonenumber: str
    Gender: str
    MailID: str
    DOB: date

class CustomerOut(CustomerCreate):
    ID: int
    class Config:
        orm_mode = True

class TeachingStaffCreate(BaseModel):
    Course: str
    SubjectExpertise: str
    WorkExperience: int
    Certifications: str
    MaritalStatus: str
    RelocationOption: str
    Designation: str

class TeachingStaffOut(TeachingStaffCreate):
    TeachingID: int
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
