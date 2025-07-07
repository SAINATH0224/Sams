from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.customer import Customer
from models.teaching_staff import TeachingStaff
from schemas.teaching_staff import TeachingStaffCreate, TeachingStaffOut
from database import SessionLocal

router = APIRouter(prefix="/teachingstaff", tags=["Teaching Staff API"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/{customer_id}", response_model=TeachingStaffOut)
def create_teaching_profile(customer_id: int, profile: TeachingStaffCreate, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    if customer.teaching_info:
        raise HTTPException(status_code=400, detail="Teaching profile already exists")
    new_profile = TeachingStaff(TeachingID=customer_id, **profile.dict())
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@router.get("", response_model=list[TeachingStaffOut])
def get_all_teaching_profiles(db: Session = Depends(get_db)):
    return db.query(TeachingStaff).all()

@router.get("/{customer_id}", response_model=TeachingStaffOut)
def get_teaching_profile(customer_id: int, db: Session = Depends(get_db)):
    profile = db.query(TeachingStaff).filter(TeachingStaff.TeachingID == customer_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Teaching profile not found")
    return profile

@router.put("/{customer_id}", response_model=TeachingStaffOut)
def update_teaching_profile(customer_id: int, data: TeachingStaffCreate, db: Session = Depends(get_db)):
    profile = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Teaching profile not found")
    
    # Course = Column(String(50))
    # SubjectExpertise = Column(String(100))
    # WorkExperience = Column(Integer)
    # Certifications = Column(String)
    # MaritalStatus = Column(String(20))
    # RelocationOption = Column(String(10))
    # Designation = Column(String(100))
    new_profile = TeachingStaff(TeachingID=customer_id, Course=data.Course, SubjectExpertise=data.SubjectExpertise,
                                WorkExperience=data.WorkExperience, Certifications=data.Certifications,
                                MaritalStatus=data.MaritalStatus, RelocationOption=data.RelocationOption,
                                Designation=data.Designation)
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@router.delete("/{customer_id}")
def delete_teaching_profile(customer_id: int, db: Session = Depends(get_db)):
    profile = db.query(TeachingStaff).filter(TeachingStaff.TeachingID == customer_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Teaching profile not found")
    db.delete(profile)
    db.commit()
    return {"message": "Teaching profile deleted successfully"}
