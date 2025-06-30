from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, Session, relationship
from pydantic import BaseModel
from datetime import date
from typing import List, Optional

# ------------------ Database Setup ------------------
DATABASE_URL = "sqlite:///university.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ------------------ SQLAlchemy Models ------------------

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

# ------------------ Pydantic Schemas ------------------

class CustomerCreate(BaseModel):
    Firstname: str
    Lastname: str
    Phonenumber: str
    Gender: str
    MailID: str
    DOB: date

class CustomerOut(CustomerCreate):
    ID: int
    class Config:
        orm_mode = True

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

class CustomerWithTeaching(BaseModel):
    ID: int
    Firstname: str
    Lastname: str
    Phonenumber: str
    Gender: str
    MailID: str
    DOB: date
    teaching_info: Optional[TeachingStaffOut]

    class Config:
        orm_mode = True

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

# ------------------ Create Database Tables ------------------
Base.metadata.create_all(bind=engine)

# ------------------ Customer CRUD ------------------

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

@app.get("/teachingstaff/", response_model=List[TeachingStaffOut], tags=["Teaching Staff API"])
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

# ------------------ Combined Customer + TeachingStaff ------------------

@app.get("/customer-teaching/{customer_id}", response_model=CustomerWithTeaching, tags=["Combined API"])
def get_customer_with_teaching(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer
