from pydantic import BaseModel
from typing import Optional

class StudentBase(BaseModel):
    Memo_10th: Optional[str]
    Memo_Inter: Optional[str]
    RankCard: Optional[str]
    TC: Optional[str]
    CasteCertificate: Optional[str]
    IncomeCertificate: Optional[str]
    AadharCard: Optional[str]
    Course: str
    Branch: str
    BloodGroup: str
    Signature: Optional[str]
    Nationality: str
    Religion: str
    Caste: str
    FatherName: str
    FatherOccupation: str
    MotherName: str
    MotherOccupation: str

class StudentCreate(StudentBase):
    pass  # No StudentID input

class StudentOut(StudentBase):
    StudentID: int

    class Config:
        orm_mode = True
