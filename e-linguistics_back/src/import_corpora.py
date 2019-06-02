# a simple python file to remind us to import the required corpora

# execute from within a python shell
from cltk.corpus.utils.importer import CorpusImporter

corpus_importer = CorpusImporter('greek')
# corpus_importer.import_corpus('greek_text_perseus')
# corpus_importer.import_corpus('greek_lexica_perseus') -- NO NEED TO DOWNLOAD - THEY GIVE DIRECT ACCESS
# corpus_importer.import_corpus('greek_word2vec_cltk')
corpus_importer.import_corpus('greek_models_cltk')


# change default NLTK_DATA to point inside the static folder
# export NLTK_DATA=./src/static/e-linguistics_data/
import nltk
nltk.download('wordnet')
# nltk.download('omw')


# also download ancient greek wordnet
# from here: https://dspace-clarin-it.ilc.cnr.it/repository/xmlui/handle/20.500.11752/ILC-56
# create a folder named omw inside the wordnet folder (/corpora/wordnet/omw)
# mkdir src/static/e-linguistics_data/corpora/wordnet/omw
# mkdir src/static/e-linguistics_data/corpora/wordnet/omw/grc
# extract the zipped files into a /corpora/wordnet/omw/grg folder
# unzip src/static/e-linguistics_data/Open_Ancient_Greek_WordNet-0_5.zip -d src/static/e-linguistics_data/corpora/wordnet/omw/grc/
# or cd to the folder and curl it there!
# curl --remote-name-all https://dspace-clarin-it.ilc.cnr.it/repository/xmlui/bitstream/handle/20.500.11752/ILC-56{/wn-data-grc.tab,/LICENSE}

# link to perseus lexicon
# http://www.perseus.tufts.edu/hopper/morph?l={word}&la=gr

# link to our target inscriptions (no. 40-360)
# https://inscriptions.packhum.org/text/190735?bookid=265&location=789
