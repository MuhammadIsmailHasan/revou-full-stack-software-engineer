"""
Contoh Praktis Many-to-Many Relationship dalam Flask-SQLAlchemy

Skenario: Student dan Course
- Satu student bisa mengambil banyak course
- Satu course bisa diambil oleh banyak student
"""

from datetime import datetime
from utils import db

# ============================================================================
# 1. ASSOCIATION TABLE (Tabel Penghubung)
# ============================================================================

student_courses = db.Table(
    'student_courses',
    db.Column('student_id', db.Integer, db.ForeignKey('students.id'), primary_key=True),
    db.Column('course_id', db.Integer, db.ForeignKey('courses.id'), primary_key=True),
    db.Column('enrolled_at', db.DateTime, default=datetime.now)
)


# ============================================================================
# 2. MODELS
# ============================================================================

class Student(db.Model):
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    nim = db.Column(db.String(20), unique=True, nullable=False)
    
    # Many-to-Many Relationship
    courses = db.relationship(
        'Course',
        secondary=student_courses,
        backref='students',  # Akses balik dari Course ke Student
        lazy='joined'
    )
    
    def to_dict(self, include_courses=True):
        data = {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'nim': self.nim
        }
        if include_courses:
            data['courses'] = [
                {'id': c.id, 'name': c.name, 'code': c.code}
                for c in self.courses
            ]
        return data
    
    def __repr__(self):
        return f'<Student {self.name}>'


class Course(db.Model):
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(10), unique=True, nullable=False)
    description = db.Column(db.Text)
    credits = db.Column(db.Integer, default=3)
    
    def to_dict(self, include_students=True):
        data = {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'description': self.description,
            'credits': self.credits
        }
        if include_students:
            data['student_count'] = len(self.students)
            data['students'] = [
                {'id': s.id, 'name': s.name, 'nim': s.nim}
                for s in self.students
            ]
        return data
    
    def __repr__(self):
        return f'<Course {self.code}: {self.name}>'


# ============================================================================
# 3. HELPER FUNCTIONS
# ============================================================================

def create_sample_data():
    """Membuat data sampel untuk testing"""
    
    # Cek apakah data sudah ada
    if Student.query.first():
        print("Data sudah ada. Skipping...")
        return
    
    # Buat students
    students = [
        Student(name='Ismail Hasan', email='ismail@example.com', nim='001'),
        Student(name='Ahmad Rizki', email='ahmad@example.com', nim='002'),
        Student(name='Siti Nurhaliza', email='siti@example.com', nim='003'),
        Student(name='Budi Santoso', email='budi@example.com', nim='004'),
    ]
    
    # Buat courses
    courses = [
        Course(name='Introduction to Python', code='PY101', credits=3,
               description='Belajar dasar-dasar Python programming'),
        Course(name='Web Development with Flask', code='WEB201', credits=4,
               description='Membangun web application dengan Flask'),
        Course(name='Database Design', code='DB301', credits=3,
               description='Desain dan implementasi database'),
        Course(name='REST API Development', code='API401', credits=4,
               description='Membuat REST API yang scalable'),
    ]
    
    # Insert ke database
    for student in students:
        db.session.add(student)
    for course in courses:
        db.session.add(course)
    
    db.session.commit()
    
    print(f"✓ Created {len(students)} students")
    print(f"✓ Created {len(courses)} courses")


def enroll_students():
    """Memasukkan students ke courses"""
    
    # Get data dari database
    students = Student.query.all()
    courses = Course.query.all()
    
    if not students or not courses:
        print("Students atau courses tidak ditemukan")
        return
    
    # Enrollment logic
    enrollments = [
        (0, 0),  # Ismail → PY101
        (0, 1),  # Ismail → WEB201
        (0, 2),  # Ismail → DB301
        (1, 0),  # Ahmad → PY101
        (1, 1),  # Ahmad → WEB201
        (2, 1),  # Siti → WEB201
        (2, 3),  # Siti → API401
        (3, 0),  # Budi → PY101
        (3, 2),  # Budi → DB301
        (3, 3),  # Budi → API401
    ]
    
    for student_idx, course_idx in enrollments:
        student = students[student_idx]
        course = courses[course_idx]
        
        # Cek apakah sudah enrolled
        if course not in student.courses:
            student.courses.append(course)
            print(f"✓ Enrolled {student.name} to {course.code}")
    
    db.session.commit()
    print(f"\n✓ Total enrollment: {len(enrollments)}")


# ============================================================================
# 4. QUERY EXAMPLES
# ============================================================================

def show_all_students():
    """Tampilkan semua students dengan courses mereka"""
    print("\n" + "="*60)
    print("ALL STUDENTS WITH THEIR COURSES")
    print("="*60)
    
    students = Student.query.all()
    for student in students:
        print(f"\n👤 {student.name} ({student.nim})")
        if student.courses:
            for course in student.courses:
                print(f"   📚 {course.code}: {course.name}")
        else:
            print("   (Tidak ada course)")


def show_all_courses():
    """Tampilkan semua courses dengan students mereka"""
    print("\n" + "="*60)
    print("ALL COURSES WITH THEIR STUDENTS")
    print("="*60)
    
    courses = Course.query.all()
    for course in courses:
        print(f"\n📚 {course.code}: {course.name}")
        print(f"   Credits: {course.credits}")
        print(f"   Total Students: {len(course.students)}")
        for student in course.students:
            print(f"   - {student.name} ({student.nim})")


def find_student_courses(student_name):
    """Cari courses yang diambil oleh seorang student"""
    print("\n" + "="*60)
    print(f"FINDING COURSES FOR: {student_name}")
    print("="*60)
    
    student = Student.query.filter_by(name=student_name).first()
    
    if not student:
        print(f"❌ Student '{student_name}' tidak ditemukan")
        return
    
    print(f"\n👤 {student.name} ({student.nim}) - mengambil {len(student.courses)} courses")
    for course in student.courses:
        print(f"   📚 {course.code}: {course.name} ({course.credits} credits)")


def find_course_students(course_code):
    """Cari students yang mengambil course tertentu"""
    print("\n" + "="*60)
    print(f"FINDING STUDENTS FOR: {course_code}")
    print("="*60)
    
    course = Course.query.filter_by(code=course_code).first()
    
    if not course:
        print(f"❌ Course '{course_code}' tidak ditemukan")
        return
    
    print(f"\n📚 {course.code}: {course.name}")
    print(f"   Total students: {len(course.students)}")
    for student in course.students:
        print(f"   - {student.name} ({student.nim})")


def get_popular_courses():
    """Tampilkan course yang paling banyak diambil"""
    print("\n" + "="*60)
    print("MOST POPULAR COURSES")
    print("="*60)
    
    courses = Course.query.all()
    # Sort berdasarkan jumlah students
    sorted_courses = sorted(courses, key=lambda c: len(c.students), reverse=True)
    
    for i, course in enumerate(sorted_courses, 1):
        print(f"{i}. {course.code}: {course.name} - {len(course.students)} students")


def get_student_workload():
    """Tampilkan beban kerja students (total credits)"""
    print("\n" + "="*60)
    print("STUDENT WORKLOAD (TOTAL CREDITS)")
    print("="*60)
    
    students = Student.query.all()
    for student in students:
        total_credits = sum(course.credits for course in student.courses)
        print(f"{student.name}: {total_credits} credits ({len(student.courses)} courses)")


# ============================================================================
# 5. MODIFY RELATIONSHIPS
# ============================================================================

def unenroll_student(student_name, course_code):
    """Unenroll student dari course"""
    print("\n" + "="*60)
    print(f"UNENROLING: {student_name} from {course_code}")
    print("="*60)
    
    student = Student.query.filter_by(name=student_name).first()
    course = Course.query.filter_by(code=course_code).first()
    
    if not student:
        print(f"❌ Student '{student_name}' tidak ditemukan")
        return
    
    if not course:
        print(f"❌ Course '{course_code}' tidak ditemukan")
        return
    
    if course in student.courses:
        student.courses.remove(course)
        db.session.commit()
        print(f"✓ Successfully unenrolled {student.name} from {course.code}")
    else:
        print(f"❌ {student.name} tidak mengambil {course.code}")


# ============================================================================
# 6. TEST / DEMO
# ============================================================================

if __name__ == '__main__':
    # Gunakan ini untuk testing di Flask shell
    # python -c "from app import app; from example_many_to_many import *; 
    #            app.app_context().push(); create_sample_data(); enroll_students(); 
    #            show_all_students(); show_all_courses()"
    pass
