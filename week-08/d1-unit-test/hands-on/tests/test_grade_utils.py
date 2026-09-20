import pytest
from app.grade_utils import calculate_average, letter_grade, is_passing, format_report

def test_calculate_average_of_multiple_grades():
    grades = [8, 8, 8]
    result = calculate_average(grades)
    
    assert result == 8

def test_calculate_average_of_single_grade():
    grade = [9]
    result = calculate_average(grade)
    
    assert result == 9
    
def test_calculate_average_empty_list_raises():
    with pytest.raises(ValueError):
        grades = []
        calculate_average(grades)
    
    

def test_letter_grade_90_and_above_returns_A():
    assert letter_grade(99) == "A"
    
def test_letter_grade_70_to_79_returns_C():
    assert letter_grade(75) == "C"
    
def test_letter_grade_below_zero_raises():
    with pytest.raises(ValueError):
        letter_grade(-5)
        


def test_is_passing_above_threshold_returns_true():
    assert is_passing(70, 50) is True
    
def test_is_passing_exactly_at_threshold_returns_true():
    assert is_passing(60, 60) is True
    
def test_is_passing_below_threshold_returns_false():
    assert is_passing(50, 70) is False



def test_format_report_contains_name_and_grade():
    name = "ismail"
    score = 95
    result = format_report(name, score)
    
    assert "ismail" in result and "Grade: A" in result

def test_format_report_failing_student_shows_failing_status():
    name = "ismail"
    score = 50
    result = format_report(name, score)
    
    assert "Status: FAILING" in result
    
def test_format_report_non_string_name_raises():
    with pytest.raises(TypeError) as exc_info:
        format_report(10, 10)
        
    assert "name must be a string" in str(exc_info.value)
    
def test_format_report_non_float_score_raises():
    with pytest.raises(TypeError):
        format_report("ismail", "90")