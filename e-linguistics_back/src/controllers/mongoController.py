import pymongo
from flask import request, jsonify
from src import app
from nltk.corpus import wordnet as wn


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
        if inscr:
            inscr['_id'] = str(inscr['_id'])
            return jsonify(inscr)
        else:
            return jsonify({})
    elif request.method == 'POST':
        # example body:
        # {"inscription_text" : "...", "phID" : "PH190736", "dateFrom" : -340, "dateTo" : -340,
        #  "id_in_publication" : "...", "general_type" : "votive", "provenance" : "...",
        #  "bibliography" : "....", "words" : [ {"word":"w1", "synsets": ["synset1", "synset2"]} ] }
        if request.get_json():
            new_inscr = request.get_json()
            new_id = db[inscr_col].insert(new_inscr)
            if new_id:
                words = new_inscr['words']
                for w in list(words):
                    synsList = []
                    for s in list(w['synsets']):
                        synset = wn.synset(s)
                        synsList.append({"synsetId": "{:08d}".format(synset.offset()) + '-' + str(synset.pos()), "synset": s})
                    db[words_col].update({"grc_word": w["word"]}, {"$set": {"eng_wn_synsets": synsList}, "$push": {"inscrs": {"$each": [new_inscr['phID']]}}}, True)
            client.close()
            return jsonify(str(new_id))
    client.close()
    return jsonify({})


@app.route(endpoint + 'inscription/getAll', methods=['GET'])
def getAllInscriptions():
    client = pymongo.MongoClient(mongo_endpoint, mongo_port)
    db = client[db_name]
    lim = 10
    off = 0

    if request.args.get('limit', ''):
        lim = int(request.args.get('limit'))
    if request.args.get('offset', ''):
        off = int(request.args.get('offset'))
    inscrs = list(db[inscr_col].find({}, {"_id": 0}).limit(lim).skip(off))
    client.close()
    return jsonify(inscrs)


@app.route(endpoint + 'word', methods=['POST', 'GET'])
def word():
    client = pymongo.MongoClient(mongo_endpoint, mongo_port)
    db = client[db_name]
    if request.method == 'GET':
        input_word = request.args.get('grcWord', '')
        # grc_word = db[words_col].find_one({"grc_word": input_word})
        grc_word = list(db[words_col].aggregate([{"$match": {"grc_word": input_word}}, {"$project": {"grc_word": "$grc_word", "eng_wn_synsets": "$eng_wn_synsets", "inscrs": {"$ifNull": ["$inscrs", None]}}}]))
        if grc_word:
            grc_word[0]["_id"] = str(grc_word[0]["_id"])
            return jsonify(grc_word)
        else:
            return jsonify({})
    elif request.method == 'POST':
        # example body: {"grc_word" : "word", "eng_wn_synsets": [{"synsetId" : "...", "synset" : "..."}] }
        if request.get_json():
            result = {}
            new_word = request.get_json()
            wn = open(app.root_path + '/static/e-linguistics_data/corpora/omw/grc/wn-data-grc.tab', 'a')
            for w in list(new_word['eng_wn_synsets']):
                oldw = db[words_col].find_one({"grc_word": new_word['grc_word'], "eng_wn_synsets": {"synsetId": w['synsetId'], "synset": w['synset']}})
                if oldw is None:
                    wn.write(w['synsetId'] + '\tgrc:lemma\t' + new_word['grc_word'] + '\n')
                    result = db[words_col].update_one({"grc_word": new_word['grc_word']}, {"$addToSet": {"eng_wn_synsets": w}}, True)
            wn.close()
            client.close()
            return jsonify(str(result))
    client.close()
    return jsonify({})


@app.route(endpoint + 'word/getAll', methods=['GET'])
def getAllWords():
    client = pymongo.MongoClient(mongo_endpoint, mongo_port)
    db = client[db_name]
    lim = 10
    off = 0
    with_inscrs = False
    if request.args.get('limit', ''):
        lim = int(request.args.get('limit'))
    if request.args.get('offset', ''):
        off = int(request.args.get('offset'))
    if request.args.get('includingIncrs', ''):
        with_inscrs = (request.args.get('includingIncrs') == 'true')

    if with_inscrs:
        words = list(db[words_col].find({"inscrs": {"$exists": True}}, {"_id": 0, "grc_word": 1, "eng_wn_synsets": 1, "inscrs": 1}).limit(lim).skip(off))
    else:
        words = list(db[words_col].find({}, {"_id": 0, "grc_word": 1, "eng_wn_synsets": 1}).limit(lim).skip(off))

    client.close()
    return jsonify(words)
