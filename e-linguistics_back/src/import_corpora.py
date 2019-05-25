# a simple python file to remind us to import the required corpora

# execute from within a python shell
from cltk.corpus.utils.importer import CorpusImporter

corpus_importer = CorpusImporter('greek')
# corpus_importer.import_corpus('greek_text_perseus')
# corpus_importer.import_corpus('greek_lexica_perseus') -- NO NEED TO DOWNLOAD - THEY GIVE DIRECT ACCESS
# corpus_importer.import_corpus('greek_word2vec_cltk')
corpus_importer.import_corpus('greek_models_cltk')


# change default NLTK_DATA
# export NLTK_DATA=../e-linguistics_data/
import nltk
nltk.download('wordnet')
# nltk.download('omw')


# also download ancient greek wordnet
# from here: https://dspace-clarin-it.ilc.cnr.it/repository/xmlui/handle/20.500.11752/ILC-56
# create a folder named omw inside the wordnet folder (/corpora/wordnet/omw)
# extract the zipped files into a /corpora/wordnet/omw/grg folder

# link to perseus lexicon
# http://www.perseus.tufts.edu/hopper/morph?l={word}&la=gr

# link to our target inscriptions (no. 40-360)
# https://inscriptions.packhum.org/text/190735?bookid=265&location=789
