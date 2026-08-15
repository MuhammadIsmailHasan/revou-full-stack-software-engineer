# Many-to-Many Quick Reference

## Visual Representation

```
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE STRUCTURE                         │
└─────────────────────────────────────────────────────────────┘

STUDENTS TABLE                COURSES TABLE
┌──────────────────┐          ┌──────────────────┐
│ id (PK)          │          │ id (PK)          │
│ name             │          │ name             │
│ email            │          │ code             │
│ nim              │          │ description      │
└──────────────────┘          │ credits          │
        │                     └──────────────────┘
        │                             │
        │         STUDENT_COURSES     │
        │    (ASSOCIATION TABLE)      │
        └──────────┬──────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    ┌───────────────────────────────┐
    │ student_id (FK → students.id) │
    │ course_id (FK → courses.id)   │
    │ enrolled_at (optional)        │
    └───────────────────────────────┘
```

---

## Model Definitions (Python)

### Simple Many-to-Many

```python
# Step 1: Create Association Table
student_courses = db.Table(
    'student_courses',
    db.Column('student_id', db.Integer, db.ForeignKey('students.id'), primary_key=True),
    db.Column('course_id', db.Integer, db.ForeignKey('courses.id'), primary_key=True)
)

# Step 2: Define Student Model
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    
    # Many-to-Many Relationship
    courses = db.relationship('Course', secondary=student_courses, backref='students')

# Step 3: Define Course Model
class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    
    # Relationship defined in Student, accessible via backref
    # Access: course.students
```

### Many-to-Many dengan Extra Data

```python
# Gunakan Model biasa sebagai association table

class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    
    # Foreign Keys (juga Primary Keys)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), primary_key=True)
    
    # Extra fields
    enrolled_at = db.Column(db.DateTime, default=datetime.now)
    grade = db.Column(db.String(2))
    attendance = db.Column(db.Integer)
    
    # Relationships
    student = db.relationship('Student', backref='enrollments')
    course = db.relationship('Course', backref='enrollments')


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    
    # Access courses through enrollments
    courses = db.relationship('Course', secondary='enrollments', backref='students')
```

---

## Operations Cheat Sheet

| Operation | Code | Notes |
|-----------|------|-------|
| **Create relation** | `student.courses.append(course)` | Add one course |
| **Create multiple** | `student.courses.extend([c1, c2, c3])` | Add multiple courses |
| **Set directly** | `student.courses = [c1, c2]` | Replace all courses |
| **Remove relation** | `student.courses.remove(course)` | Remove one course |
| **Clear all** | `student.courses.clear()` | Remove all courses |
| **Check exists** | `course in student.courses` | Boolean check |
| **Count** | `len(student.courses)` | Count relations |
| **Iterate** | `for course in student.courses:` | Loop through |
| **Access via backref** | `course.students` | Reverse access |
| **Lazy load** | `student = Student.query.get(1)` | Load on access |
| **Eager load** | `lazy='joined'` in relationship | Load immediately |

---

## Query Examples

### Find with Relationships

```python
# Students dengan jumlah courses tertentu
students_with_courses = Student.query.filter(
    Student.courses.any()
).all()

# Courses yang diambil oleh student tertentu
courses = Product.query.filter(
    Course.students.any(Student.id == 1)
).all()

# Students yang mengambil semua courses
all_students_courses = Student.query.outerjoin(
    student_courses
).group_by(Student.id).all()
```

### Aggregation

```python
from sqlalchemy import func

# Count students per course
course_stats = db.session.query(
    Course.name,
    func.count(student_courses.c.student_id).label('student_count')
).outerjoin(student_courses).group_by(Course.id).all()

# Students dengan most courses
top_students = db.session.query(
    Student.name,
    func.count(student_courses.c.course_id).label('course_count')
).outerjoin(student_courses).group_by(Student.id).order_by(
    func.count(student_courses.c.course_id).desc()
).all()
```

---

## API Routes Pattern

```python
# Get all with relationships
@app.route('/students')
def get_students():
    students = Student.query.all()
    return [s.to_dict() for s in students]

# Get specific with relationships
@app.route('/students/<id>')
def get_student(id):
    student = Student.query.get_or_404(id)
    return student.to_dict()

# Create relation
@app.route('/students/<s_id>/enroll/<c_id>', methods=['POST'])
def enroll(s_id, c_id):
    student = Student.query.get_or_404(s_id)
    course = Course.query.get_or_404(c_id)
    
    if course not in student.courses:
        student.courses.append(course)
        db.session.commit()
    return {'message': 'Enrolled'}

# Remove relation
@app.route('/students/<s_id>/unenroll/<c_id>', methods=['DELETE'])
def unenroll(s_id, c_id):
    student = Student.query.get_or_404(s_id)
    course = Course.query.get_or_404(c_id)
    
    if course in student.courses:
        student.courses.remove(course)
        db.session.commit()
    return {'message': 'Unenrolled'}
```

---

## Common Mistakes & Solutions

### ❌ Problem: Relationship tidak dimuat

```python
# WRONG
student = Student.query.get(1)
print(student.courses)  # Lazy loading tidak terjadi

# RIGHT
student = Student.query.filter_by(id=1).first()
print(student.courses)  # Atau gunakan joined
```

### ❌ Problem: Circular reference saat to_dict()

```python
# WRONG
def to_dict(self):
    return {
        'courses': [c.to_dict() for c in self.courses]  # c.to_dict() return students!
    }

# RIGHT - Add parameter untuk kontrol
def to_dict(self, include_courses=True):
    data = {'id': self.id, 'name': self.name}
    if include_courses:
        data['courses'] = [
            {'id': c.id, 'name': c.name}
            for c in self.courses
        ]
    return data
```

### ❌ Problem: Duplicate enrollments

```python
# WRONG
student.courses.append(course)
db.session.commit()
student.courses.append(course)  # Adds duplicate?
db.session.commit()

# RIGHT - Check first
if course not in student.courses:
    student.courses.append(course)
    db.session.commit()
```

---

## Database Setup Commands

```bash
# Create migration file
flask db migrate -m "Add many-to-many relationship"

# View pending migration
cat migrations/versions/[filename].py

# Apply migration
flask db upgrade

# Downgrade migration
flask db downgrade

# Current database version
flask db current

# Migration history
flask db history
```

---

## Testing

```python
# Flask Shell Testing
flask shell

>>> from app import app, db
>>> from models import Student, Course
>>> 
>>> # Create test data
>>> s = Student(name='Test', email='test@example.com', nim='001')
>>> c = Course(name='Python', code='PY101')
>>> db.session.add_all([s, c])
>>> db.session.commit()
>>> 
>>> # Add relationship
>>> s.courses.append(c)
>>> db.session.commit()
>>> 
>>> # Verify
>>> print(s.courses)
>>> print(c.students)
>>> 
>>> # Query
>>> Student.query.filter(Student.courses.any(Course.code == 'PY101')).all()
```

---

## Performance Tips

1. **Use lazy='joined'** untuk eager loading
   ```python
   courses = db.relationship('Course', secondary=student_courses, lazy='joined')
   ```

2. **Use lazy='select'** untuk lazy loading (default)
   ```python
   courses = db.relationship('Course', secondary=student_courses, lazy='select')
   ```

3. **Paginate large relationships**
   ```python
   page = request.args.get('page', 1, type=int)
   courses = student.courses.paginate(page=page, per_page=10)
   ```

4. **Avoid N+1 queries**
   ```python
   # Use joinedload untuk prefetch
   from sqlalchemy.orm import joinedload
   students = Student.query.options(joinedload(Student.courses)).all()
   ```

---

## Real-World Scenarios

### Scenario 1: Course Registration System
- **Models**: Student, Course, Enrollment
- **Many-to-Many**: Student ↔ Course
- **Extra Data**: Enrollment (grade, attendance, semester)

### Scenario 2: Shopping Cart
- **Models**: User, Product, Cart
- **Many-to-Many**: User ↔ Product (via Cart)
- **Extra Data**: CartItem (quantity, added_at)

### Scenario 3: Social Network
- **Models**: User, Friend Request
- **Many-to-Many**: User ↔ User (followers/following)
- **Extra Data**: Friendship (followed_at, status)

### Scenario 4: Blog System
- **Models**: Post, Tag, Category
- **Many-to-Many**: Post ↔ Tag, Post ↔ Category
- **Extra Data**: None needed (just relationships)

---

## Useful SQLAlchemy Functions

```python
from sqlalchemy import and_, or_, func

# AND condition
Student.query.filter(and_(
    Student.courses.any(),
    Student.name.like('%Ismail%')
)).all()

# OR condition
Course.query.filter(or_(
    Course.code.startswith('PY'),
    Course.code.startswith('WEB')
)).all()

# COUNT
course_count = db.session.query(func.count(student_courses.c.course_id)).filter(
    student_courses.c.student_id == 1
).scalar()

# EXISTS
has_course = db.session.query(
    Student.query.filter_by(id=1).filter(
        Student.courses.any(Course.code == 'PY101')
    ).exists()
).scalar()
```

