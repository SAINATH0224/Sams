from sqlalchemy import Column, Integer, String, Date,  Enum as SqlEnum
from sqlalchemy.orm import relationship
from database import Base
from enum import Enum

class UserType(str, Enum):
    staff = "staff"
    student = "student"
    management = "management"

class Customer(Base):
    __tablename__ = "Customer"
    ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Firstname = Column(String(100))
    Lastname = Column(String(100))
    Phonenumber = Column(String(15))
    Gender = Column(String(10))
    MailID = Column(String(100), unique=True)
    DOB = Column(Date)
    CustomerType = Column(SqlEnum(UserType))  # e.g., "Student", "Staff", etc.
    Password = Column(String(255))  # You can increase size or hash before storing


    teaching_info = relationship("TeachingStaff", back_populates="customer", uselist=False)
    student = relationship("Student", back_populates="customer", uselist=False)
