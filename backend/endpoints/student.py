from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
import base64
import cv2
import numpy as np
from models.student import Student
from models.customer import Customer
from schemas.student import StudentCreate, StudentBase, StudentOut
from database import SessionLocal

router = APIRouter(prefix="/student", tags=["Student API"])

# ---------- Pydantic Model for Image Upload ----------
class ImageUpload(BaseModel):
    image_base64: str

# ---------- Face Detection Function ----------
def detect_single_face(image_bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        return False
    face_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    )
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    return len(faces) == 1

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

# ✅ Face Verification for Student
@router.post("/verify-face/{customer_id}")
def verify_face(customer_id: str, data: ImageUpload):
    """
    Verify if the uploaded image contains exactly one face for student verification
    using the given customer_id.
    """
    # 1. Decode the image
    try:
        image_base64 = data.image_base64.split(",")[-1]  # remove prefix if exists
        image_bytes = base64.b64decode(image_base64)
    except Exception:
        raise HTTPException(status_code=400, detail="❌ Invalid base64 format.")

    # 2. Detect face
    is_valid_face = detect_single_face(image_bytes)

    # 3. Log customer ID
    print(f"Verifying face for customer ID: {customer_id}")

    return {
        "valid_face": is_valid_face,
        "customer_id": customer_id
    }

