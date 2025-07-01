from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

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

class TeachingStaff(Base):
    __tablename__ = "TeachingStaff"
    TeachingID = Column(Integer, ForeignKey("Customer.ID"), primary_key=True)
    Course = Column(String(50))
    SubjectExpertise = Column(String(100))
    WorkExperience = Column(Integer)
    Certifications = Column(String)
    MaritalStatus = Column(String(20))
    RelocationOption = Column(String(10))
    Designation = Column(String(100))

    customer = relationship("Customer", back_populates="teaching_info")