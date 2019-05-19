# a simple python file to remind us to import the required corpora

from cltk.corpus.utils.importer import CorpusImporter

corpus_importer = CorpusImporter('greek')
# corpus_importer.import_corpus('greek_text_perseus')
# corpus_importer.import_corpus('greek_lexica_perseus')
# corpus_importer.import_corpus('greek_word2vec_cltk')
corpus_importer.import_corpus('greek_models_cltk')


# set env variable first
# export NLTK_DATA=../e-linguistics_data/
import nltk
nltk.download('wordnet')
nltk.download('omw')
# also download ancient greek wordnet
# from here: https://dspace-clarin-it.ilc.cnr.it/repository/xmlui/handle/20.500.11752/ILC-56
# and add extract the zipped files into a corpora/wordnet/omw/grg folder
