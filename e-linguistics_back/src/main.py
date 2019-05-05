# coding=utf-8
from . import app
from flask import jsonify


@app.route('/')
def home_msg():
    msg = 'Welcome to our app !!!'

    return jsonify(msg)


@app.route('/welcome')
def get_welcome():
    msg = 'Welcome to our app !!!'

    return jsonify(msg)

