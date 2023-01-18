# Grape Quiz
A simple quiz app named grape cause I love grapes.

This repository contains:
* Django (backend).
* Next.js (frontend).

As these are two of the most popular frameworks for development on 2023.

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
