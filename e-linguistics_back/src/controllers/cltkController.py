from flask import request, jsonify
from src import app
from cltk.stem.lemma import LemmaReplacer


endpoint = '/cltk/'


@app.route(endpoint + 'lemmatize', methods=['POST'])
def lemmatize():
    req_data = request.get_json()
    if req_data and req_data['input_text']:
        input_text = req_data['input_text']
        lemmatizer = LemmaReplacer('greek')
        return jsonify(lemmatizer.lemmatize(input_text))

    return jsonify({})
