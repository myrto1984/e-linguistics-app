import pymongo
import json
from flask import request, jsonify
from src import app


endpoint = '/db/'
mongo_endpoint = app.config['MONGO_URL']
mongo_port = app.config['MONGO_PORT']


@app.route(endpoint + 'inscription', methods=['POST', 'GET'])
def inscription():
    client = pymongo.MongoClient(mongo_endpoint, mongo_port)
    db = client.e_linguistics_db
    if request.method == 'GET':
        inscr_id = request.args.get('id', '')
        inscription = db.inscriptions.find({ "phID": inscr_id })
        client.close()
        return inscription
