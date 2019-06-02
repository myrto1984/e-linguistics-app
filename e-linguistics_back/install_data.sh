#!/bin/bash
export NLTK_DATA=./src/static/e-linguistics_data/

mkdir src/static
mkdir src/static/e-linguistics_data

python src/import_corpora.py

mkdir src/static/e-linguistics_data/corpora/wordnet/omw
mkdir src/static/e-linguistics_data/corpora/wordnet/omw/grc
cd src/static/e-linguistics_data/corpora/wordnet/omw/grc
curl --remote-name-all https://dspace-clarin-it.ilc.cnr.it/repository/xmlui/bitstream/handle/20.500.11752/ILC-56{/wn-data-grc.tab,/LICENSE}

