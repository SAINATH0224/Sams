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
    profile = db.query(TeachingStaff).filter(TeachingStaff.TeachingID == customer_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Teaching profile not found")
    
    # 🔁 Update fields dynamically
    for field, value in vars(data).items():
        setattr(profile, field, value)

    db.commit()
    db.refresh(profile)
    return profile


@router.delete("/{customer_id}")
def delete_teaching_profile(customer_id: int, db: Session = Depends(get_db)):
    profile = db.query(TeachingStaff).filter(TeachingStaff.TeachingID == customer_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Teaching profile not found")
    db.delete(profile)
    db.commit()
    return {"message": "Teaching profile deleted successfully"}
