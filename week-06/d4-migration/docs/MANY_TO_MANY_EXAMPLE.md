# Many-to-Many Relationship dalam Flask-SQLAlchemy

## Konsep Dasar

Many-to-Many relationship adalah hubungan antara dua model dimana:
- Satu model A bisa berhubungan dengan banyak model B
- Satu model B bisa berhubungan dengan banyak model A

Contoh: **User memiliki banyak Orders, dan Order memiliki banyak Products**

---

## 1. Membuat Association Table (Tabel Penghubung)

Association table adalah tabel yang menyimpan foreign key dari kedua tabel yang berhubungan.

```python
# Ini adalah association table (tabel penghubung)
order_products = db.Table(
    'order_products',  # nama tabel
    db.Column('order_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True)
)
```

**Penjelasan:**
- Tabel ini menghubungkan `orders` dengan `products`
- Setiap baris merepresentasikan satu relasi antara satu order dengan satu product
- Kombinasi `order_id` dan `product_id` adalah unique (primary key gabungan)

---

## 2. Mendefinisikan Models dengan Many-to-Many

```python
class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    # ... field lainnya


class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Mendefinisikan relationship many-to-many
    products = db.relationship(
        'Product',
        secondary=order_products,  # menggunakan association table
        backref='orders'            # akses balik dari Product ke Order
    )
```

**Penjelasan:**
- `secondary=order_products`: menunjukkan tabel penghubung yang digunakan
- `backref='orders'`: memungkinkan akses dari Product → Orders (produk.orders)

---

## 3. Menggunakan Many-to-Many Relationship

### A. Menambah Produk ke Order

```python
# Metode 1: Menggunakan append()
product = Product.query.get(1)
order = Order.query.get(1)
order.products.append(product)
db.session.commit()

# Metode 2: Langsung assignment
order.products = [product1, product2, product3]
db.session.commit()
```

### B. Menghapus Produk dari Order

```python
# Metode 1: Menggunakan remove()
order.products.remove(product)
db.session.commit()

# Metode 2: Clear semua produk
order.products.clear()
db.session.commit()
```

### C. Mengakses Relasi

```python
# Dari Order → Products
order = Order.query.get(1)
print(order.products)  # List semua produk di order ini
for product in order.products:
    print(product.name, product.price)

# Dari Product → Orders (menggunakan backref)
product = Product.query.get(1)
print(product.orders)  # List semua order yang berisi produk ini
```

### D. Query dengan Relasi

```python
# Cari order yang mengandung produk tertentu
from sqlalchemy import and_

orders_with_product = Order.query.filter(
    Order.products.any(Product.id == 1)
).all()

# Cari product yang ada di order tertentu
products_in_order = Product.query.filter(
    Product.orders.any(Order.id == 1)
).all()

# Cari order yang berisi lebih dari 3 produk
orders_multiple = Order.query.filter(
    Order.products.any()
).all()
```

---

## 4. Contoh Praktis Lengkap

### Setup Models
```python
from datetime import datetime
from utils import db

# Association Table
student_courses = db.Table(
    'student_courses',
    db.Column('student_id', db.Integer, db.ForeignKey('students.id'), primary_key=True),
    db.Column('course_id', db.Integer, db.ForeignKey('courses.id'), primary_key=True)
)

# Models
class Student(db.Model):
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    
    # Many-to-Many relationship
    courses = db.relationship(
        'Course',
        secondary=student_courses,
        backref='students'
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'courses': [c.to_dict() for c in self.courses]
        }


class Course(db.Model):
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(10), unique=True, nullable=False)
    description = db.Column(db.Text)
    credits = db.Column(db.Integer, default=3)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'description': self.description,
            'credits': self.credits
        }
```

### Routes untuk Many-to-Many
```python
from flask import Blueprint, request, jsonify
from models import Student, Course
from utils import db

api = Blueprint('api', __name__, url_prefix='/api')

# Enroll student ke course
@api.route('/students/<int:student_id>/enroll/<int:course_id>', methods=['POST'])
def enroll_student(student_id, course_id):
    student = Student.query.get_or_404(student_id)
    course = Course.query.get_or_404(course_id)
    
    # Cek apakah sudah enrolled
    if course in student.courses:
        return jsonify({'message': 'Already enrolled'}), 400
    
    student.courses.append(course)
    db.session.commit()
    
    return jsonify({
        'message': f'Student {student.name} enrolled in {course.name}',
        'student': student.to_dict()
    }), 201


# Unenroll student dari course
@api.route('/students/<int:student_id>/unenroll/<int:course_id>', methods=['DELETE'])
def unenroll_student(student_id, course_id):
    student = Student.query.get_or_404(student_id)
    course = Course.query.get_or_404(course_id)
    
    if course not in student.courses:
        return jsonify({'message': 'Not enrolled'}), 400
    
    student.courses.remove(course)
    db.session.commit()
    
    return jsonify({'message': 'Unenrolled successfully'}), 200


# Get student dengan semua courses
@api.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    student = Student.query.get_or_404(student_id)
    return jsonify(student.to_dict()), 200


# Get course dengan semua students
@api.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = Course.query.get_or_404(course_id)
    return jsonify({
        **course.to_dict(),
        'students': [s.to_dict() for s in course.students]
    }), 200
```

---

## 5. Advanced: Association Table dengan Extra Data

Kadang kita perlu menyimpan data tambahan di association table. Gunakan model biasa:

```python
class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), primary_key=True)
    
    # Extra fields
    enrolled_at = db.Column(db.DateTime, default=datetime.now)
    grade = db.Column(db.String(2))  # A, B, C, D, F
    attendance = db.Column(db.Integer, default=0)  # persentase
    
    # Relationships
    student = db.relationship('Student', backref='enrollments')
    course = db.relationship('Course', backref='enrollments')
    
    def to_dict(self):
        return {
            'student_id': self.student_id,
            'course_id': self.course_id,
            'enrolled_at': self.enrolled_at.isoformat(),
            'grade': self.grade,
            'attendance': self.attendance
        }


class Student(db.Model):
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    
    # Akses enrollment records
    courses = db.relationship('Course', secondary='enrollments')


# Usage
enrollment = Enrollment(student_id=1, course_id=1, grade='A', attendance=95)
db.session.add(enrollment)
db.session.commit()
```

---

## 6. Kesimpulan

| Operasi | Kode |
|---------|------|
| **Tambah relasi** | `model1.relation.append(model2)` |
| **Hapus relasi** | `model1.relation.remove(model2)` |
| **Hapus semua** | `model1.relation.clear()` |
| **Akses relasi** | `model1.relation` |
| **Query dengan relasi** | `.filter(Model.relation.any(Condition))` |
| **Backref** | `model2.backref_name` |

