from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.customer import Customer
from schemas.customer import CustomerCreate, CustomerOut, CustomerWithTeaching, LoginRequest, LoginResponse
from database import SessionLocal

router = APIRouter(prefix="/customers", tags=["Customer API"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login", response_model=LoginResponse)
def customer_login(customer: LoginRequest, db: Session = Depends(get_db)):
    
    user_details = db.query(Customer).filter(Customer.Phonenumber == customer.user_name).first()

    if not user_details:
        raise HTTPException(status_code=400, detail="User not found") 

    return LoginResponse(ID=user_details.ID, Firstname=user_details.Firstname, Lastname=user_details.Lastname,
                         Phonenumber=user_details.Phonenumber, Gender=user_details.Gender,
                         MailID=user_details.MailID, DOB=user_details.DOB)



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
