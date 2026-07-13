# Exercise 4:
# Given temperature readings for 30 days (date, temperature, humidity), filter days with temperature > 25°C,
# calculate average humidity on hot days, and find the hottest day.

def process_weather(weather) :
    normal_temperature = []
    sum_humanities = 0
    hottest_day = weather[0]['temperature']

    for row in weather :
        if row['temperature'] > 25 :
            sum_humanities += row['humidity']

            if row['temperature'] > hottest_day :
                hottest_day = row['temperature']

            normal_temperature.append(row)

    if len(normal_temperature) == 0 :
        average_humidity = 0
    else :
        average_humidity = sum_humanities / len(normal_temperature)

    return normal_temperature, average_humidity, hottest_day


weather_data = [
    {"date": "2025-06-01", "temperature": 24.5, "humidity": 78},
    {"date": "2025-06-02", "temperature": 26.1, "humidity": 72},
    {"date": "2025-06-03", "temperature": 27.8, "humidity": 68},
    {"date": "2025-06-04", "temperature": 23.9, "humidity": 81},
    {"date": "2025-06-05", "temperature": 29.2, "humidity": 65},
    {"date": "2025-06-06", "temperature": 30.5, "humidity": 60},
    {"date": "2025-06-07", "temperature": 25.4, "humidity": 74},
    {"date": "2025-06-08", "temperature": 22.8, "humidity": 85},
    {"date": "2025-06-09", "temperature": 26.9, "humidity": 70},
    {"date": "2025-06-10", "temperature": 31.1, "humidity": 58},
    {"date": "2025-06-11", "temperature": 28.7, "humidity": 66},
    {"date": "2025-06-12", "temperature": 24.2, "humidity": 79},
    {"date": "2025-06-13", "temperature": 27.3, "humidity": 69},
    {"date": "2025-06-14", "temperature": 29.8, "humidity": 63},
    {"date": "2025-06-15", "temperature": 25.0, "humidity": 76},
    {"date": "2025-06-16", "temperature": 32.4, "humidity": 55},
    {"date": "2025-06-17", "temperature": 26.5, "humidity": 71},
    {"date": "2025-06-18", "temperature": 28.0, "humidity": 67},
    {"date": "2025-06-19", "temperature": 24.7, "humidity": 80},
    {"date": "2025-06-20", "temperature": 30.0, "humidity": 61},
    {"date": "2025-06-21", "temperature": 27.1, "humidity": 70},
    {"date": "2025-06-22", "temperature": 25.8, "humidity": 73},
    {"date": "2025-06-23", "temperature": 23.5, "humidity": 82},
    {"date": "2025-06-24", "temperature": 31.8, "humidity": 57},
    {"date": "2025-06-25", "temperature": 29.5, "humidity": 64},
    {"date": "2025-06-26", "temperature": 26.3, "humidity": 72},
    {"date": "2025-06-27", "temperature": 24.0, "humidity": 77},
    {"date": "2025-06-28", "temperature": 33.2, "humidity": 54},
    {"date": "2025-06-29", "temperature": 28.4, "humidity": 68},
    {"date": "2025-06-30", "temperature": 27.6, "humidity": 69},
]

normal_temperature, average, hottest = process_weather(weather_data)
for row in normal_temperature :
    print(row)

print("")
print("average : ", average)

print("")
print("hottest : ", hottest)