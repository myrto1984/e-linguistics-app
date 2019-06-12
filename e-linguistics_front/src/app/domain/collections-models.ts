export class FindResults {
  definition: string;
  synset_offset: string;
  wn_synset: string;
}

export class Word {
  word: string;
  synsets: string[];
}

export class Inscription {
  inscription_text: string;
  phID: string;
  dateFrom: number;
  dateTo: number;
  id_in_publication: string;
  general_type: string;
  provenance: string;
  bibliography: string;
  words: Word[];
}
