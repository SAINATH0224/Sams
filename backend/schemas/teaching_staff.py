from pydantic import BaseModel

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
