from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Student(Base):
    __tablename__ = "Student"

    StudentID = Column(Integer, ForeignKey("Customer.ID"), primary_key=True)
    Memo_10th = Column(Text)
    Memo_Inter = Column(Text)
    RankCard = Column(Text)
    TC = Column(Text)
    CasteCertificate = Column(Text)
    IncomeCertificate = Column(Text)
    AadharCard = Column(Text)
    Course = Column(String(50))
    Branch = Column(String(50))
    BloodGroup = Column(String(10))
    Signature = Column(Text)
    Nationality = Column(String(30))
    Religion = Column(String(30))
    Caste = Column(String(30))
    FatherName = Column(String(100))
    FatherOccupation = Column(String(100))
    MotherName = Column(String(100))
    MotherOccupation = Column(String(100))

    customer = relationship("Customer", back_populates="student")
