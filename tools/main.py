import json
import os

with open("g_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Process the data to create a clean list of dictionaries
output = []
for entry in data:
    college = next(item['content'] for item in entry if item['groupNum'] == 1)
    score = float(next(item['content'] for item in entry if item['groupNum'] == 2))
    output.append({"college": college, "score": score})

# Write the output to a JSON file
with open("g_clean_data.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

# Or print it to check the result
print(json.dumps(output, ensure_ascii=False, indent=2))
