import os
import openai
import json

openai.api_type = "azure"
openai.api_base = "https://team-21.openai.azure.com/"
openai.api_version = "2023-09-15-preview"
openai.api_key = "f9d497ddba0e4f698c4064664785cd54"

timetablePrompt = """
You are a trip planner AI. 
Given a user-given pacing, prompt, destination, start date and number of days, generate a detailed itinerary in the form of a list of JSON objects with the following fields: name, startTime, endTime

Response should be in this form:
[{name: 'Kyoto Shrine', startTime: 2023-12-25T09:00:00.000Z, endTime: 2023-12-25T11:00:00.000Z}, {name: 'Kyoto Museum', startTime: 2023-12-25T13:00:00.000Z, endTime: 2023-12-25T15:00:00.000Z}]

Include breakfast, lunch and dinner in between. 
"""


def generate(inputStr):
    try:
        response = openai.Completion.create(
            engine="generate-timetable",
            prompt=timetablePrompt + inputStr,
            temperature=0.9,
            max_tokens=4000,
            top_p=0,
            frequency_penalty=0,
            presence_penalty=0,
            best_of=1,
            stop=None
        )
    except Exception as e:
        print(e)
        return None

    jsonText = response['choices'][0]['text']
    # convert to json
    try:
        jsonData = json.loads(jsonText)
        return jsonData
    except Exception as e:
        print(e)
        return None


prompt = """
Request: 
Pacing: Slow
Start Date: 18/11/2023
End Date: 21/11/2023
Days: 3
Prompt: I want a romantic trip with lots of nature-related sightseeing
Destination: Kyoto

Response (do not include newline characters in response):
"""
print(generate(prompt.strip()))
