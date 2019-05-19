from flask import request, jsonify
from src import app
from cltk.stem.lemma import LemmaReplacer


endpoint = '/cltk/'


@app.route(endpoint + 'lemmatize', methods=['POST'])
def lemmatize():
    req_data = request.get_json()
    input_text = req_data['input_text']
    lemmatizer = LemmaReplacer('greek')

    return jsonify(lemmatizer.lemmatize(input_text, return_raw=True))
