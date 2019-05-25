from flask import request, jsonify
from src import app
from nltk.corpus import wordnet as wn


endpoint = '/nltk/'


@app.route(endpoint + 'tokenize', methods=['POST'])
def tokenize():
    req_data = request.get_json()
    input_text = str(req_data['input_text'])

    input_text = input_text.replace('.', ' .')
    input_text = input_text.replace(',', ' ,')
    input_text = input_text.replace('[', '')
    input_text = input_text.replace(']', '')
    input_text = input_text.replace('\n', ' ')
    input_text = input_text.replace('\t', ' ')
    input_text = input_text.replace('\r\n', ' ')
    input_text = input_text.replace('\r\t', ' ')
    input_text = input_text.replace('  ', ' ')

    output = input_text.split(' ')

    return jsonify(output)


@app.route(endpoint + 'find/<lang>/synsets', methods=['POST'])
def find_synsets(lang):
    req_data = request.get_json()
    word = str(req_data['search_word'])
    print('PRINTING: ' + lang)

    output = []
    for i, w in enumerate(wn.synsets(word, lang=lang)):
        output.append({"wn_synset": str(w.name()), "definition": str(w.definition())})

    return jsonify(output)
