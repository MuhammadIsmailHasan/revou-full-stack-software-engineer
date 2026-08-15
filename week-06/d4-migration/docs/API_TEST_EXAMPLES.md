# Many-to-Many API - Testing & Examples

## Setup

### 1. Register Blueprint di app.py

```python
from flask import Flask
from routes import products_bp, users_bp, category_bp
from routes_many_to_many import m2m_bp  # Import blueprint
from utils import db

def init_app():
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ismail:ismail@localhost/flask_migration'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    # Register blueprints
    app.register_blueprint(products_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(category_bp)
    app.register_blueprint(m2m_bp)  # Register di sini
    
    return app

app = init_app()
```

### 2. Setup Database

```bash
# Create migration
flask db migrate -m "Add student and course models"

# Apply migration
flask db upgrade

# Run Flask shell
flask shell

# Initialize data
>>> from example_many_to_many import create_sample_data, enroll_students
>>> create_sample_data()
>>> enroll_students()
>>> exit()
```

---

## API ENDPOINTS

### Health Check

```bash
GET /api/m2m/health

Response:
{
  "status": "ok",
  "message": "Many-to-Many API is running"
}
```

---

## STUDENT ENDPOINTS

### 1. Get All Students

```bash
curl -X GET http://localhost:5000/api/m2m/students

Response:
[
  {
    "id": 1,
    "name": "Ismail Hasan",
    "email": "ismail@example.com",
    "nim": "001",
    "courses": [
      {"id": 1, "name": "Introduction to Python", "code": "PY101"},
      {"id": 2, "name": "Web Development with Flask", "code": "WEB201"}
    ]
  },
  ...
]
```

### 2. Get Specific Student

```bash
curl -X GET http://localhost:5000/api/m2m/students/1

Response:
{
  "id": 1,
  "name": "Ismail Hasan",
  "email": "ismail@example.com",
  "nim": "001",
  "courses": [
    {"id": 1, "name": "Introduction to Python", "code": "PY101"},
    {"id": 2, "name": "Web Development with Flask", "code": "WEB201"},
    {"id": 3, "name": "Database Design", "code": "DB301"}
  ]
}
```

### 3. Create New Student

```bash
curl -X POST http://localhost:5000/api/m2m/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rina Kusuma",
    "email": "rina@example.com",
    "nim": "005"
  }'

Response:
{
  "id": 5,
  "name": "Rina Kusuma",
  "email": "rina@example.com",
  "nim": "005",
  "courses": []
}
```

### 4. Update Student

```bash
curl -X PUT http://localhost:5000/api/m2m/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ismail Hasan Updated",
    "email": "ismail.new@example.com"
  }'

Response:
{
  "id": 1,
  "name": "Ismail Hasan Updated",
  "email": "ismail.new@example.com",
  "nim": "001",
  "courses": [...]
}
```

### 5. Delete Student

```bash
curl -X DELETE http://localhost:5000/api/m2m/students/5

Response:
{
  "message": "Student deleted"
}
```

---

## COURSE ENDPOINTS

### 1. Get All Courses

```bash
curl -X GET http://localhost:5000/api/m2m/courses

Response:
[
  {
    "id": 1,
    "name": "Introduction to Python",
    "code": "PY101",
    "description": "Belajar dasar-dasar Python programming",
    "credits": 3,
    "student_count": 3,
    "students": [
      {"id": 1, "name": "Ismail Hasan", "nim": "001"},
      {"id": 2, "name": "Ahmad Rizki", "nim": "002"},
      {"id": 4, "name": "Budi Santoso", "nim": "004"}
    ]
  },
  ...
]
```

### 2. Get Specific Course

```bash
curl -X GET http://localhost:5000/api/m2m/courses/1

Response:
{
  "id": 1,
  "name": "Introduction to Python",
  "code": "PY101",
  "description": "Belajar dasar-dasar Python programming",
  "credits": 3,
  "student_count": 3,
  "students": [
    {"id": 1, "name": "Ismail Hasan", "nim": "001"},
    {"id": 2, "name": "Ahmad Rizki", "nim": "002"},
    {"id": 4, "name": "Budi Santoso", "nim": "004"}
  ]
}
```

### 3. Create New Course

```bash
curl -X POST http://localhost:5000/api/m2m/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Machine Learning Basics",
    "code": "ML501",
    "description": "Introduction to machine learning algorithms",
    "credits": 4
  }'

Response:
{
  "id": 5,
  "name": "Machine Learning Basics",
  "code": "ML501",
  "description": "Introduction to machine learning algorithms",
  "credits": 4,
  "student_count": 0,
  "students": []
}
```

---

## ENROLLMENT ENDPOINTS (Many-to-Many Operations)

### 1. Enroll Student to Course

```bash
curl -X POST http://localhost:5000/api/m2m/students/1/enroll/4 \
  -H "Content-Type: application/json"

Response:
{
  "message": "Student enrolled in WEB201",
  "student": {
    "id": 1,
    "name": "Ismail Hasan",
    "email": "ismail@example.com",
    "nim": "001",
    "courses": [...]
  },
  "course": {
    "id": 4,
    "name": "REST API Development",
    "code": "API401",
    ...
  }
}
```

### 2. Unenroll Student from Course

```bash
curl -X DELETE http://localhost:5000/api/m2m/students/1/unenroll/1 \
  -H "Content-Type: application/json"

Response:
{
  "message": "Student unenrolled from PY101"
}
```

### 3. Get Student's Courses

```bash
curl -X GET http://localhost:5000/api/m2m/students/1/courses

Response:
{
  "student": {
    "id": 1,
    "name": "Ismail Hasan",
    "email": "ismail@example.com",
    "nim": "001"
  },
  "courses": [
    {
      "id": 2,
      "name": "Web Development with Flask",
      "code": "WEB201",
      "description": "Membangun web application dengan Flask",
      "credits": 4
    },
    {
      "id": 3,
      "name": "Database Design",
      "code": "DB301",
      "description": "Desain dan implementasi database",
      "credits": 3
    }
  ],
  "total_courses": 2,
  "total_credits": 7
}
```

### 4. Get Course's Students

```bash
curl -X GET http://localhost:5000/api/m2m/courses/1/students

Response:
{
  "course": {
    "id": 1,
    "name": "Introduction to Python",
    "code": "PY101",
    "description": "Belajar dasar-dasar Python programming",
    "credits": 3
  },
  "students": [
    {"id": 1, "name": "Ismail Hasan", "nim": "001"},
    {"id": 2, "name": "Ahmad Rizki", "nim": "002"},
    {"id": 4, "name": "Budi Santoso", "nim": "004"}
  ],
  "total_students": 3
}
```

### 5. Bulk Enroll Student to Multiple Courses

```bash
curl -X POST http://localhost:5000/api/m2m/students/5/courses/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "course_ids": [1, 3, 4]
  }'

Response:
{
  "message": "Bulk enrollment completed",
  "successfully_enrolled": ["PY101", "DB301", "API401"],
  "already_enrolled": [],
  "not_found": [],
  "student": {
    "id": 5,
    "name": "Rina Kusuma",
    "email": "rina@example.com",
    "nim": "005",
    "courses": [...]
  }
}
```

---

## STATISTICS ENDPOINT

### Get Overall Statistics

```bash
curl -X GET http://localhost:5000/api/m2m/statistics

Response:
{
  "total_students": 4,
  "total_courses": 4,
  "total_enrollments": 10,
  "avg_courses_per_student": 2.5,
  "avg_students_per_course": 2.5,
  "most_popular_course": {
    "code": "API401",
    "name": "REST API Development",
    "students": 2
  },
  "busiest_student": {
    "name": "Ismail Hasan",
    "courses": 3
  }
}
```

---

## Error Responses

### 404 - Not Found

```bash
curl -X GET http://localhost:5000/api/m2m/students/999

Response: 404
{
  "error": "Resource not found"
}
```

### 400 - Bad Request (Duplicate Email)

```bash
curl -X POST http://localhost:5000/api/m2m/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Another User",
    "email": "ismail@example.com",
    "nim": "006"
  }'

Response: 400
{
  "error": "Email already exists"
}
```

### 400 - Already Enrolled

```bash
curl -X POST http://localhost:5000/api/m2m/students/1/enroll/1 \
  -H "Content-Type: application/json"

Response: 400
{
  "error": "Student already enrolled in this course"
}
```

---

## Testing dengan Python Requests

```python
import requests

BASE_URL = "http://localhost:5000/api/m2m"

# Create student
response = requests.post(f"{BASE_URL}/students", json={
    "name": "Test Student",
    "email": "test@example.com",
    "nim": "999"
})
print(response.json())

# Create course
response = requests.post(f"{BASE_URL}/courses", json={
    "name": "Test Course",
    "code": "TEST101",
    "description": "Test course",
    "credits": 3
})
print(response.json())

# Enroll
response = requests.post(f"{BASE_URL}/students/1/enroll/1")
print(response.json())

# Get statistics
response = requests.get(f"{BASE_URL}/statistics")
print(response.json())
```

---

## Common Operations

### Scenario 1: Seorang Student Mengambil Multiple Courses

```bash
# 1. Create student
curl -X POST http://localhost:5000/api/m2m/students \
  -H "Content-Type: application/json" \
  -d '{"name": "Adi Sutrisno", "email": "adi@example.com", "nim": "006"}'

# Store student ID dari response (misal: 6)

# 2. Enroll ke multiple courses
curl -X POST http://localhost:5000/api/m2m/students/6/courses/bulk \
  -H "Content-Type: application/json" \
  -d '{"course_ids": [1, 2, 3]}'

# 3. Check student's courses
curl -X GET http://localhost:5000/api/m2m/students/6/courses
```

### Scenario 2: Lihat Semua Students di Sebuah Course

```bash
curl -X GET http://localhost:5000/api/m2m/courses/1/students
```

### Scenario 3: Update Course dan Lihat Effect

```bash
# 1. Update course
curl -X PUT http://localhost:5000/api/m2m/courses/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Advanced Python Programming", "credits": 4}'

# 2. Lihat update
curl -X GET http://localhost:5000/api/m2m/courses/1
```

