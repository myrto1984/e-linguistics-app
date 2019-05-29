import pymongo
from flask import request, jsonify
from src import app
from nltk.corpus import wordnet as wn


endpoint = '/grc_to_mongo/'
mongo_endpoint = app.config['MONGO_URL']
mongo_port = app.config['MONGO_PORT']
db_name = app.config['DB_NAME']
inscr_col = app.config['INSCR_COL']
words_col = app.config['WORDS_COL']


@app.route(endpoint, methods=['GET'])
def grc_to_mongo():
    # client = pymongo.MongoClient(mongo_endpoint, mongo_port)
    # db = client[db_name]
    # with open(app.root_path + '/static/e-linguistics_data/corpora/omw/grc/wn-data-grc.tab', 'r') as grc_wn:
    #     for w in grc_wn:
    #         if w[0] != '#':
    #             w = w.replace('\n', '')
    #             new_word = w.split('\t')
    #             synsetId = new_word[0].split('-')
    #             synset = wn.synset_from_pos_and_offset(synsetId[1], int(synsetId[0]))
    #             synset_entry = {"synsetId" : new_word[0], "synset" : str(synset.name())}
    #             db[words_col].update_one({"grc_word": new_word[2]}, {"$push": {"eng_wn_synsets": {"$each": [synset_entry] } } }, True)
    # grc_wn.close()
    # client.close()

    return jsonify("The original grc was already parsed")
