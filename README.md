# SAMS – Smart Attendance Management System

SAMS is an intelligent attendance management system designed to automate and secure student attendance using face recognition technology. The system integrates a web-based frontend, a Python-powered backend, and a data science module for face verification to eliminate manual attendance and prevent proxy entries.

## 📌 Project Architecture
SAMS follows a modular and scalable architecture with a clear separation of concerns.

```
Sams/
│
├── backend/ # Backend APIs and business logic
│ ├── endpoints/ # API endpoints (student, customer, staff)
│ ├── models/ # Database models
│ ├── schemas/ # Request/response schemas
│ ├── database.py # Database configuration
│ ├── main.py # Backend application entry point
│ └── requirements.txt # Backend dependencies
│
├── datascience/ # Face recognition & validation logic
│ ├── faceregognition.py
│ ├── image_encodings.py
│ ├── Validation_Encodings.py
│ └── readme.md
│
├── frontend/ # Web-based user interface
│ ├── public/ # Static assets
│ ├── src/ # Frontend source code
│ ├── package.json
│ └── README.md
│
```
## ✨ Key Features
- Smart punch-in attendance system  
- Face recognition–based student verification  
- Secure backend APIs for attendance management  
- Modular frontend for student and staff interaction  
- Scalable architecture using backend and data science integration  

## 🛠️ Technologies Used
### Frontend
- HTML
- CSS
- JavaScript
- Node.js ecosystem

### Backend
- Python
- REST APIs
- bcrypt & passlib for authentication security

### Data Science
- Python
- Face recognition and image encoding techniques

## ⚙️ System Workflow
1. Student initiates attendance through the frontend  
2. Backend processes the punch-in request  
3. Face image is sent to the data science module  
4. Identity is verified using face encodings  
5. Attendance is securely recorded  

## 🎯 Use Cases
- College and university attendance systems  
- Smart classroom environments  
- Secure academic attendance tracking  

## 🔮 Future Enhancements
- Attendance analytics and reporting dashboards  
- Role-based access (Admin / Faculty / Student)  
- Cloud deployment  
- Mobile application support  

## 🤝 Contributors
This project is developed collaboratively by the SAMS team.
