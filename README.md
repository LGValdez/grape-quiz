# Grape Quiz
A simple quiz app named grape cause I love grapes.

This repository contains:
* Django (backend).
* Next.js (frontend).

As these are two of the most popular frameworks for development on 2023.

Versions used for this project:
* Python 3.10.6
* Node v18.13.0
* Npm 8.19.3

## Backend - Django
1. Create a virtual environment, in this example (venv).
2. Install requirements (some might work with updated versions).
```
$ source venv/bin/activate
(venv)$ pip install -r backend/requirements.txt
```
3. Run the migrations locally.
```
(venv)$ python backend/manage.py makemigrations
(venv)$ python backend/manage.py migrate
```
4. (Optional) Create a sueruser.
```
(venv)$ python backend/manage.py createsuperuser
```
5. Run the backend service.
```
(venv)$ python backend/manage.py runserver
```
This should have you all set and with app running on default django port.

If you are using a different frontend, you should update the `settings.py` file to include it on `CORS_ALLOWED_ORIGINS`.

### ENV
Check the .env.sample field to know all environment variables.

## Frontend - Next.js
No need for any fancy stuff since Next apps are usually out of the box.

1. Move to the frontend folder.
```
$ cd frontend/
```
2. Install dependencies.
```
$ npm install
```
3. Run the frontend service.
```
$ npm run dev
```
### ENV
Update the .env.local.sample -> .env.local and update `NEXT_PUBLIC_GRAPE_QUIZ_API_URL` to the backend api url.
