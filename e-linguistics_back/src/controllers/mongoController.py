import pymongo
from bson.json_util import dumps
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
        inscr_id = request.args.get('phID', '')
        inscr = db.inscriptions.find_one({"phID": inscr_id})
        client.close()
        return str(inscr)
    elif request.method == 'POST':
        # example body:
        # { "inscription_text" : "...", "phID" : "PH190736", "dateFrom" : "-340", "dateTo" : "-340", "id_in_publication" : "...", "general_type" : "αναθηματική", "provenance" : "...", "bibliography" : "....", "words" : ["w1_synsetId", "w2_synsetId", ...] }
        if request.get_json():
            new_inscr = db.inscriptions.insert(request.get_json())
            client.close()
            return str(new_inscr)
    client.close()
    return jsonify({})

