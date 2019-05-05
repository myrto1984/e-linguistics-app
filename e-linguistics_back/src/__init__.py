# coding=utf-8
from flask import Flask, jsonify, request

app = Flask(__name__)
app.config.from_pyfile('config.py')

# from .sessionlogs import sessionsController
# from .sessionlogs import storyController
