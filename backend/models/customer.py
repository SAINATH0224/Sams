from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from database import Base

class Customer(Base):
    __tablename__ = "Customer"
    ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Firstname = Column(String(100))
    Lastname = Column(String(100))
    Phonenumber = Column(String(15))
    Gender = Column(String(10))
    MailID = Column(String(100), unique=True)
    DOB = Column(Date)

    teaching_info = relationship("TeachingStaff", back_populates="customer", uselist=False)
