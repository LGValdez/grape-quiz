import json
import requests

API_URL = 'http://localhost:8000/api/v1/'
QUIZZES_URL = f'{API_URL}quizzes/'
QUESTIONS_URL = f'{API_URL}questions/'
ANSWERS_URL = f'{API_URL}answers/'


def main():
    json_file = open('./scripts/local_data.json')
    local_data = json.loads(json_file.read())
    for quiz in local_data:
        quiz_values = {
            "name": quiz["name"],
            "description": quiz["description"],
            "code": quiz["code"],
            "approve_score": quiz["approve_score"],
            "quiz_size": quiz["quiz_size"],
            "user": quiz["user"],
        }
        response = requests.post(QUIZZES_URL, json=quiz_values)
        quiz_id = response.json().get("id")
        for question in quiz["questions"]:
            question_values = {
                "quiz": quiz_id,
                "sequence": question["sequence"],
                "name": question["name"],
            }
            response = requests.post(QUESTIONS_URL, json=question_values)
            question_id = response.json().get("id")
            for answer in question["answers"]:
                answer_values = {
                    "question": question_id,
                    "name": answer["name"],
                    "is_correct": answer["is_correct"],

                }
                requests.post(ANSWERS_URL, json=answer_values)


if __name__ == '__main__':
    main()
