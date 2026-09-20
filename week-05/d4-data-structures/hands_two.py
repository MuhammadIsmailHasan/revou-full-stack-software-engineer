scores = [85, 92, 78, 55, 95, 67, 88, 73, 91, 60]

print("=== Student Score Report ===")
print(f"Total students: {len(scores)}")

# Step 2: Highest and lowest
print(f"Highest: {max(scores)}")
print(f"Lowest: {min(scores)}")

# Step 3: Average
print(f"Lowest: {sum(scores) / len(scores)}")

# Step 4: Scores above 75
print("\nScores above 75:")
for score in scores :
    if score > 75 :
        print(score)

# Step 5 + 6: Count and pass rate
passing_count = sum(1 for score in scores if score > 75)
print(f"\nStudents above 75: {passing_count} out of {len(scores)}")

print(f"Pass rate: {(passing_count / len(scores)) * 100}%")