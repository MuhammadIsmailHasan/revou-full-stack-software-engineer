"""
Routes untuk Many-to-Many Relationship
Contoh API untuk Student dan Course management
"""

from flask import Blueprint, request, jsonify
from example_many_to_many import Student, Course
from utils import db

# Create blueprint
m2m_bp = Blueprint('m2m', __name__, url_prefix='/api/m2m')


# ============================================================================
# STUDENT ROUTES
# ============================================================================

@m2m_bp.route('/students', methods=['GET'])
def get_all_students():
    """
    GET /api/m2m/students
    Ambil semua students dengan courses mereka
    """
    students = Student.query.all()
    return jsonify([s.to_dict() for s in students]), 200


@m2m_bp.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    """
    GET /api/m2m/students/<id>
    Ambil student spesifik
    """
    student = Student.query.get_or_404(student_id)
    return jsonify(student.to_dict()), 200


@m2m_bp.route('/students', methods=['POST'])
def create_student():
    """
    POST /api/m2m/students
    Buat student baru
    
    Request body:
    {
        "name": "John Doe",
        "email": "john@example.com",
        "nim": "005"
    }
    """
    data = request.get_json()
    
    # Validasi
    if not data or not all(k in data for k in ['name', 'email', 'nim']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Cek duplikat
    if Student.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    if Student.query.filter_by(nim=data['nim']).first():
        return jsonify({'error': 'NIM already exists'}), 400
    
    # Create student
    student = Student(
        name=data['name'],
        email=data['email'],
        nim=data['nim']
    )
    
    db.session.add(student)
    db.session.commit()
    
    return jsonify(student.to_dict()), 201


@m2m_bp.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    """
    PUT /api/m2m/students/<id>
    Update data student
    """
    student = Student.query.get_or_404(student_id)
    data = request.get_json()
    
    if 'name' in data:
        student.name = data['name']
    if 'email' in data:
        student.email = data['email']
    if 'nim' in data:
        student.nim = data['nim']
    
    db.session.commit()
    
    return jsonify(student.to_dict()), 200


@m2m_bp.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    """
    DELETE /api/m2m/students/<id>
    Hapus student
    """
    student = Student.query.get_or_404(student_id)
    db.session.delete(student)
    db.session.commit()
    
    return jsonify({'message': 'Student deleted'}), 200


# ============================================================================
# COURSE ROUTES
# ============================================================================

@m2m_bp.route('/courses', methods=['GET'])
def get_all_courses():
    """
    GET /api/m2m/courses
    Ambil semua courses
    """
    courses = Course.query.all()
    return jsonify([c.to_dict() for c in courses]), 200


@m2m_bp.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    """
    GET /api/m2m/courses/<id>
    Ambil course spesifik dengan students
    """
    course = Course.query.get_or_404(course_id)
    return jsonify(course.to_dict()), 200


@m2m_bp.route('/courses', methods=['POST'])
def create_course():
    """
    POST /api/m2m/courses
    Buat course baru
    
    Request body:
    {
        "name": "Advanced Python",
        "code": "PY501",
        "description": "Learn advanced python",
        "credits": 4
    }
    """
    data = request.get_json()
    
    # Validasi
    required = ['name', 'code', 'description']
    if not data or not all(k in data for k in required):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Cek duplikat
    if Course.query.filter_by(code=data['code']).first():
        return jsonify({'error': 'Course code already exists'}), 400
    
    course = Course(
        name=data['name'],
        code=data['code'],
        description=data['description'],
        credits=data.get('credits', 3)
    )
    
    db.session.add(course)
    db.session.commit()
    
    return jsonify(course.to_dict()), 201


@m2m_bp.route('/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    """
    PUT /api/m2m/courses/<id>
    Update course
    """
    course = Course.query.get_or_404(course_id)
    data = request.get_json()
    
    if 'name' in data:
        course.name = data['name']
    if 'description' in data:
        course.description = data['description']
    if 'credits' in data:
        course.credits = data['credits']
    
    db.session.commit()
    
    return jsonify(course.to_dict()), 200


@m2m_bp.route('/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    """
    DELETE /api/m2m/courses/<id>
    Hapus course
    """
    course = Course.query.get_or_404(course_id)
    db.session.delete(course)
    db.session.commit()
    
    return jsonify({'message': 'Course deleted'}), 200


# ============================================================================
# ENROLLMENT ROUTES (Many-to-Many Management)
# ============================================================================

@m2m_bp.route('/students/<int:student_id>/courses', methods=['GET'])
def get_student_courses(student_id):
    """
    GET /api/m2m/students/<id>/courses
    Ambil semua courses yang diambil oleh seorang student
    """
    student = Student.query.get_or_404(student_id)
    courses = student.courses
    
    return jsonify({
        'student': student.to_dict(include_courses=False),
        'courses': [c.to_dict(include_students=False) for c in courses],
        'total_courses': len(courses),
        'total_credits': sum(c.credits for c in courses)
    }), 200


@m2m_bp.route('/courses/<int:course_id>/students', methods=['GET'])
def get_course_students(course_id):
    """
    GET /api/m2m/courses/<id>/students
    Ambil semua students yang mengambil seorang course
    """
    course = Course.query.get_or_404(course_id)
    students = course.students
    
    return jsonify({
        'course': course.to_dict(include_students=False),
        'students': [s.to_dict(include_courses=False) for s in students],
        'total_students': len(students)
    }), 200


@m2m_bp.route('/students/<int:student_id>/enroll/<int:course_id>', methods=['POST'])
def enroll_student(student_id, course_id):
    """
    POST /api/m2m/students/<student_id>/enroll/<course_id>
    Enroll student ke course
    """
    student = Student.query.get_or_404(student_id)
    course = Course.query.get_or_404(course_id)
    
    # Cek apakah sudah enrolled
    if course in student.courses:
        return jsonify({
            'error': 'Student already enrolled in this course'
        }), 400
    
    # Add relationship
    student.courses.append(course)
    db.session.commit()
    
    return jsonify({
        'message': f'Student enrolled in {course.code}',
        'student': student.to_dict(),
        'course': course.to_dict(include_students=False)
    }), 201


@m2m_bp.route('/students/<int:student_id>/unenroll/<int:course_id>', methods=['DELETE'])
def unenroll_student(student_id, course_id):
    """
    DELETE /api/m2m/students/<student_id>/unenroll/<course_id>
    Unenroll student dari course
    """
    student = Student.query.get_or_404(student_id)
    course = Course.query.get_or_404(course_id)
    
    # Cek apakah enrolled
    if course not in student.courses:
        return jsonify({
            'error': 'Student not enrolled in this course'
        }), 400
    
    # Remove relationship
    student.courses.remove(course)
    db.session.commit()
    
    return jsonify({
        'message': f'Student unenrolled from {course.code}'
    }), 200


@m2m_bp.route('/students/<int:student_id>/courses/bulk', methods=['POST'])
def enroll_multiple_courses(student_id):
    """
    POST /api/m2m/students/<id>/courses/bulk
    Enroll student ke multiple courses sekaligus
    
    Request body:
    {
        "course_ids": [1, 2, 3]
    }
    """
    student = Student.query.get_or_404(student_id)
    data = request.get_json()
    
    if not data or 'course_ids' not in data:
        return jsonify({'error': 'Missing course_ids'}), 400
    
    course_ids = data['course_ids']
    successfully_enrolled = []
    already_enrolled = []
    not_found = []
    
    for course_id in course_ids:
        course = Course.query.get(course_id)
        
        if not course:
            not_found.append(course_id)
            continue
        
        if course in student.courses:
            already_enrolled.append(course.code)
            continue
        
        student.courses.append(course)
        successfully_enrolled.append(course.code)
    
    db.session.commit()
    
    return jsonify({
        'message': 'Bulk enrollment completed',
        'successfully_enrolled': successfully_enrolled,
        'already_enrolled': already_enrolled,
        'not_found': not_found,
        'student': student.to_dict()
    }), 200


@m2m_bp.route('/statistics', methods=['GET'])
def get_statistics():
    """
    GET /api/m2m/statistics
    Dapatkan statistik tentang enrollments
    """
    students = Student.query.all()
    courses = Course.query.all()
    
    total_enrollments = sum(len(s.courses) for s in students)
    avg_courses_per_student = total_enrollments / len(students) if students else 0
    avg_students_per_course = total_enrollments / len(courses) if courses else 0
    
    # Find most popular course
    most_popular = max(courses, key=lambda c: len(c.students)) if courses else None
    
    # Find student dengan most courses
    busiest_student = max(students, key=lambda s: len(s.courses)) if students else None
    
    return jsonify({
        'total_students': len(students),
        'total_courses': len(courses),
        'total_enrollments': total_enrollments,
        'avg_courses_per_student': round(avg_courses_per_student, 2),
        'avg_students_per_course': round(avg_students_per_course, 2),
        'most_popular_course': {
            'code': most_popular.code,
            'name': most_popular.name,
            'students': len(most_popular.students)
        } if most_popular else None,
        'busiest_student': {
            'name': busiest_student.name,
            'courses': len(busiest_student.courses)
        } if busiest_student else None
    }), 200


# ============================================================================
# ERROR HANDLERS
# ============================================================================

@m2m_bp.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404


@m2m_bp.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400


# ============================================================================
# HEALTH CHECK
# ============================================================================

@m2m_bp.route('/health', methods=['GET'])
def health_check():
    """
    GET /api/m2m/health
    Check if API is running
    """
    return jsonify({'status': 'ok', 'message': 'Many-to-Many API is running'}), 200
