from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Date
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from pydantic import BaseModel
from datetime import date
from typing import List, Optional

# ------------------ Database Setup ------------------
# DATABASE_URL = "mysql+pymysql://root:abhi1234@localhost/scams"
DATABASE_URL = "sqlite:///sams.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ------------------ SQLAlchemy Model ------------------
class Customer(Base):
    __tablename__ = "Customer"

    ID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Firstname = Column(String(100))
    Lastname = Column(String(100))
    Phonenumber = Column(String(15))
    Gender = Column(String(10))
    MailID = Column(String(100))
    Customertype = Column(String(30))  
    DOB = Column(Date)

# ------------------ Pydantic Schemas ------------------
class CustomerCreate(BaseModel):
    Firstname: str
    Lastname: str
    Phonenumber: str
    Gender: str
    MailID: str
    Customertype: str
    DOB: date

class CustomerUpdate(BaseModel):
    Firstname: Optional[str]
    Lastname: Optional[str]
    Phonenumber: Optional[str]
    Gender: Optional[str]
    MailID: Optional[str]
    Customertype: Optional[str]
    DOB: Optional[date]

class CustomerOut(CustomerCreate):
    ID: int

    class Config:
        orm_mode = True

# ------------------ FastAPI Setup ------------------
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ------------------ POST: Create ------------------
@app.post("/customers/", response_model=CustomerOut)
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    new_customer = Customer(**customer.dict())
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer

# ------------------ GET: All Customers ------------------
@app.get("/customers/", response_model=List[CustomerOut])
def get_all_customers(db: Session = Depends(get_db)):
    return db.query(Customer).all()

# ------------------ GET: One Customer ------------------
@app.get("/customers/{customer_id}", response_model=CustomerOut)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

# ------------------ PUT: Update Customer ------------------
@app.put("/customers/{customer_id}", response_model=CustomerOut)
def update_customer(customer_id: int, customer_data: CustomerUpdate, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    for key, value in customer_data.dict(exclude_unset=True).items():
        setattr(customer, key, value)
    db.commit()
    db.refresh(customer)
    return customer

# ------------------ DELETE: Remove Customer ------------------
@app.delete("/customers/{customer_id}")
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    db.delete(customer)
    db.commit()
    return {"message": "Customer deleted successfully"}
