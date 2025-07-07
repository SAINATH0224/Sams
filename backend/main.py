from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import List
from database import Base

from models.customer import Customer
from models.teaching_staff import TeachingStaff
from schemas.customer import CustomerCreate, CustomerOut, CustomerWithTeaching, LoginRequest, LoginResponse 
from schemas.teaching_staff import TeachingStaffCreate, TeachingStaffOut

# ------------------ Database Setup ------------------
DATABASE_URL = "sqlite:///university.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

# ------------------ FastAPI Setup ------------------
app = FastAPI(
    title="University Management API",
    description="Manage Customers and Teaching Staff details",
    version="1.0.0"
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ------------------ Customer CRUD ------------------

@app.post("/login", response_model=LoginResponse)
def customer_login(customer: LoginRequest, db: Session = Depends(get_db)):
    
    user_details = db.query(Customer).filter(Customer.Phonenumber == customer.user_name).first()

    if not user_details:
        raise HTTPException(status_code=400, detail="User not found") 

    return LoginResponse(ID=user_details.ID, Firstname=user_details.Firstname, Lastname=user_details.Lastname,
                         Phonenumber=user_details.Phonenumber, Gender=user_details.Gender,
                         MailID=user_details.MailID, DOB=user_details.DOB)



@app.post("/customers", response_model=CustomerOut, tags=["Customer API"])
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    db_customer = Customer(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

@app.get("/customers", response_model=List[CustomerOut], tags=["Customer API"])
def get_all_customers(db: Session = Depends(get_db)):
    return db.query(Customer).all()

@app.get("/customers/{customer_id}", response_model=CustomerOut, tags=["Customer API"])
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@app.delete("/customers/{customer_id}", tags=["Customer API"])
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    db.delete(customer)
    db.commit()
    return {"message": "Customer deleted successfully"}

# ------------------ TeachingStaff CRUD ------------------
@app.post("/teachingstaff/{customer_id}", response_model=TeachingStaffOut, tags=["Teaching Staff API"])
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

@app.get("/teachingstaff", response_model=List[TeachingStaffOut], tags=["Teaching Staff API"])
def get_all_teaching_profiles(db: Session = Depends(get_db)):
    return db.query(TeachingStaff).all()

@app.get("/teachingstaff/{customer_id}", response_model=TeachingStaffOut, tags=["Teaching Staff API"])
def get_teaching_profile(customer_id: int, db: Session = Depends(get_db)):
    profile = db.query(TeachingStaff).filter(TeachingStaff.TeachingID == customer_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Teaching profile not found")
    return profile

@app.put("/teachingstaff/{customer_id}", response_model=TeachingStaffOut, tags=["Teaching Staff API"])
def update_teaching_profile(customer_id: int, data: TeachingStaffCreate, db: Session = Depends(get_db)):
    profile = db.query(TeachingStaff).filter(TeachingStaff.TeachingID == customer_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Teaching profile not found")
    for key, value in data.dict().items():
        setattr(profile, key, value)
    db.commit()
    db.refresh(profile)
    return profile

@app.delete("/teachingstaff/{customer_id}", tags=["Teaching Staff API"])
def delete_teaching_profile(customer_id: int, db: Session = Depends(get_db)):
    profile = db.query(TeachingStaff).filter(TeachingStaff.TeachingID == customer_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Teaching profile not found")
    db.delete(profile)
    db.commit()
    return {"message": "Teaching profile deleted successfully"}

# ------------------ Combined API ------------------
@app.get("/customer-teaching/{customer_id}", response_model=CustomerWithTeaching, tags=["Combined API"])
def get_customer_with_teaching(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer
