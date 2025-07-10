from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.customer import Customer
from schemas.customer import CustomerCreate, CustomerOut, CustomerWithTeaching, LoginRequest, LoginResponse, AllCustomers, CustomerDetails
from database import SessionLocal
from passlib.context import CryptContext
from schemas.customer import CustomerWithStudent
from models.customer import Customer


router = APIRouter(prefix="/customers", tags=["Customer API"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


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

    if not verify_password(customer.password, user_details.Password):
        raise HTTPException(status_code=401, detail="Invalid password")


    return LoginResponse(ID=user_details.ID, Firstname=user_details.Firstname, Lastname=user_details.Lastname,
                         Phonenumber=user_details.Phonenumber, Gender=user_details.Gender,
                         MailID=user_details.MailID, DOB=user_details.DOB,customer_type=user_details.CustomerType)



@router.post("", response_model=CustomerOut)
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    customer_data = customer.dict()
    customer_data["Password"] = hash_password(customer.Password)
    db_customer = Customer(**customer_data)
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

@router.get("", response_model=AllCustomers)
def get_all_customers(db: Session = Depends(get_db)):
    customers = db.query(Customer).all()
    all_customers = []
    for user_details in customers:
        temp_user = CustomerDetails(ID=user_details.ID, Firstname=user_details.Firstname, Lastname=user_details.Lastname,
                         Phonenumber=user_details.Phonenumber, Gender=user_details.Gender,
                         MailID=user_details.MailID, DOB=user_details.DOB,customer_type=user_details.CustomerType)
        all_customers.append(temp_user)
    if not all_customers:
        raise HTTPException(status_code=404, detail="No customers found")
    
    return AllCustomers(data=all_customers, msg="Success") 

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

@router.get("/customers/student/{customer_id}", response_model=CustomerWithStudent)
def get_customer_with_student(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    if customer.CustomerType != "student":
        raise HTTPException(status_code=400, detail="Customer is not a student")
    return customer