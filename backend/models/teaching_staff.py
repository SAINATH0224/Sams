from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

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
