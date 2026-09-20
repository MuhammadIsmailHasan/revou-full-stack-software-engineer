def add(a, b):
    return a + b


def is_palindrome(text):
    cleaned = text.lower().replace(" ", "")
    return cleaned == cleaned[::-1]


def clamp(value, minimum, maximum):
    if value < minimum:
        return minimum
    if value > maximum:
        return maximum
    
    return value


def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b