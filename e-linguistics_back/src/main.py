# coding=utf-8
from . import app
from flask import jsonify, render_template


@app.route('/')
def home_msg():
    msg = 'Welcome to our app !!!'

    return jsonify(msg)


@app.route('/methods')
def get_available_methods():
    return render_template('api_methods.html')
