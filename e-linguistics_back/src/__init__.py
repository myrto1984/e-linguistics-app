# coding=utf-8
from flask import Flask

app = Flask(__name__)
app.config.from_pyfile('config.py')

from .cltk import nltkController
from .cltk import cltkController
