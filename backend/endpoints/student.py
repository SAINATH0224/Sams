from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.student import Student
from models.customer import Customer
from schemas.student import StudentCreate, StudentBase, StudentOut
from database import SessionLocal

router = APIRouter(prefix="/student", tags=["Student API"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Create Student
@router.post("/students/{customer_id}", response_model=StudentOut)
def create_student(customer_id: int, student_data: StudentCreate, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="No customer available for the given ID")
    if customer.CustomerType != "student":
        raise HTTPException(status_code=400, detail="This customer is not of type 'student'")
    if db.query(Student).filter(Student.StudentID == customer_id).first():
        raise HTTPException(status_code=400, detail="Student record already exists for this customer")
    
    db_student = Student(StudentID=customer_id, **student_data.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

# ✅ Get Student by ID
@router.get("/students/{customer_id}", response_model=StudentOut)
def get_student(customer_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.StudentID == customer_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student details not found for this customer ID")
    return student

# ✅ Update Student
@router.put("/students/{customer_id}", response_model=StudentOut)
def update_student(customer_id: int, updated_data: StudentBase, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.StudentID == customer_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found for this customer ID")
    for key, value in updated_data.dict().items():
        setattr(student, key, value)
    db.commit()
    db.refresh(student)
    return student

# ✅ Delete Student
@router.delete("/students/{customer_id}")
def delete_student(customer_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.StudentID == customer_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found for this customer ID")
    db.delete(student)
    db.commit()
    return {"message": "Student record deleted successfully"}
