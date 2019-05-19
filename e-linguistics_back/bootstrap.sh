#!/bin/bash
export NLTK_DATA=../e-linguistics_data/

export FLASK_APP=./src/main.py

# TODO:: DISABLE IN PRODUCTION
export FLASK_ENV=development

source $(pipenv --venv)/bin/activate
flask run -h 0.0.0.0
