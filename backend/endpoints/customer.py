from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.customer import Customer
from schemas.customer import CustomerCreate, CustomerOut, CustomerWithTeaching
from database import SessionLocal

router = APIRouter(prefix="/customers", tags=["Customer API"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("", response_model=CustomerOut)
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    db_customer = Customer(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

@router.get("", response_model=list[CustomerOut])
def get_all_customers(db: Session = Depends(get_db)):
    return db.query(Customer).all()

@router.get("/{customer_id}", response_model=CustomerOut)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.delete("/{customer_id}")
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    db.delete(customer)
    db.commit()
    return {"message": "Customer deleted successfully"}

@router.get("/teaching/{customer_id}", response_model=CustomerWithTeaching)
def get_customer_with_teaching(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer
