from app.utils import add, is_palindrome, clamp, celsius_to_fahrenheit, divide
import pytest

def test_add_positive_numbers():
    a = 5
    b = 10
    
    result = add(a, b)
    
    assert result == 15

def test_add_negative_numbers():
    assert add(-5, -3) == -8 

def test_is_palindrome_true():
    text = "kasur ini rusak"
    
    assert is_palindrome(text) is True

def test_is_palindrome_false():
    text = "hello"
    
    assert is_palindrome(text) is False

def test_clamp_within_range():
    minimum = 20
    maximum = 80
    value = 50
    
    assert clamp(value, minimum, maximum)

def test_celsius_to_fahrenheit():
    celsius = 10
    
    assert celsius_to_fahrenheit(celsius) == 50
    
def test_divide_by_zero():
    with pytest.raises(ValueError) as exc_info:
        divide(10, 0)
        
    assert "Cannot divide by zero" in str(exc_info.value)