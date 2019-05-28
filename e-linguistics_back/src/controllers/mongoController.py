import pymongo
from flask import request, jsonify
from src import app


endpoint = '/db/'
mongo_endpoint = app.config['MONGO_URL']
mongo_port = app.config['MONGO_PORT']
db_name = app.config['DB_NAME']
inscr_col = app.config['INSCR_COL']
words_col = app.config['WORDS_COL']


@app.route(endpoint + 'inscription', methods=['POST', 'GET'])
def inscription():
    client = pymongo.MongoClient(mongo_endpoint, mongo_port)
    db = client[db_name]
    if request.method == 'GET':
        inscr_id = request.args.get('phID', '')
        inscr = db[inscr_col].find_one({"phID": inscr_id})
        inscr['_id'] = str(inscr['_id'])
        return jsonify(inscr)
    elif request.method == 'POST':
        # example body:
        # { "inscription_text" : "...", "phID" : "PH190736", "dateFrom" : -340, "dateTo" : -340,
        # "id_in_publication" : "...", "general_type" : "αναθηματική", "provenance" : "...",
        # "bibliography" : "....", "words" : ["w1_synsetId", "w2_synsetId", ...] }
        if request.get_json():
            # TODO:: CONVERT TO UPDATE
            new_inscr = db.inscriptions.insert(request.get_json())
            client.close()
            return jsonify(str(new_inscr))
    client.close()
    return jsonify({})


@app.route(endpoint + 'word', methods=['POST', 'GET'])
def word():
    client = pymongo.MongoClient(mongo_endpoint, mongo_port)
    db = client[db_name]
    if request.method == 'GET':
        word_id = request.args.get('synsetId', '')
        word = db[inscr_col].find_one({"synsetId": word_id})
        word['_id'] = str(word['_id'])
        return jsonify(word)
    elif request.method == 'POST':
        # example body:
        # { "synsetId" : "...", "synset" : "....", "definition" : "...", "eng_word" : "...",
        # "grc_word" : "w1" }
        if request.get_json():
            new_word = request.get_json()
            result = db[words_col].update({"synsetId": new_word['synsetId']},
                                          {"synsetId": new_word['synsetId'],
                                           "synset": new_word['synset'],
                                           "eng_word": new_word['eng_word'],
                                           "grc_words": {"$addToSet": new_word['grc_word']}})
            client.close()
            return str(result)
    client.close()
    return jsonify({})
