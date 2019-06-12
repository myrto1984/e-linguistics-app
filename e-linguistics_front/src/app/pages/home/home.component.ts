import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NltkService} from "../../services/nltk.service";
import {CltkService} from "../../services/cltk.service";
import {FindResults, Word} from "../../domain/collections-models";
import {DbInscriptionService} from "../../services/db-inscription.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
  errorMassage: string;
  myForm: FormGroup;
  englishLemma: FormGroup;
  submitLemma: FormGroup;
  inscriptionForm: FormGroup;
  result: string[];
  lemmas: string[];
  findResults: FindResults[];
  noResults: string;
  words: Word[] = [];
  word: Word;
  disableAddWord = true;
  disableSave = true;
  strikeThrough: boolean[] = [];
  wordIndex: number;
  loading = false;
  perseus_lexicon_HTML: any;

  formPrepare = {
    inscription_text: ['', Validators.required],
    phID: 'PH190736',
    dateFrom: '-340',
    dateTo: '340',
    id_in_publication: '',
    general_type: 'votive',
    provenance: '',
    bibliography: '',
    words: this.fb.array([])
  };

  createWordsField(): FormGroup {
    return this.fb.group({
      word: '',
      synsets: this.fb.array([])
    });
  }

  constructor(private nltkService: NltkService,
              private cltkService: CltkService,
              private dbService: DbInscriptionService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initWord();
  }

  initForm() {
    this.myForm = this.fb.group({input_text: ['', Validators.required]});
    this.englishLemma = this.fb.group({input_text: ['', Validators.required]});
    this.inscriptionForm = this.fb.group(this.formPrepare);
  }

  sendTextToBack() {
    this.errorMassage = '';
    this.strikeThrough = [];
    this.myForm.get('input_text').setValue(this.myForm.get('input_text').value.replace(/\s+/g, " "));
    if (this.myForm.valid) {
      this.nltkService.tokenizeText(this.myForm.value).subscribe(
        res => {
          this.result = res;
        },
        er => console.log(er)
      );
    } else {
      this.errorMassage = 'Please put an inscription in text area.';
    }
  }

  lemmatize(lemma: string) {
    this.submitLemma = this.fb.group({input_text: ['', Validators.required]});
    this.noResults = '';
    this.perseus_lexicon_HTML = '';
    this.lemmas = [];
    this.loading = true;
    this.cltkService.lemmatizeText(lemma).subscribe(
      res => {
        this.lemmas = res;
        this.loading = false;
        this.submitLemma.get('input_text').setValue(this.lemmas[0]);
        this.wordIndex = this.result.findIndex(word => word === lemma);
      },
      er => console.log(er)
    );
  }

  getLemma(word: string, language: string) {
    this.perseus_lexicon_HTML = '';
    this.disableAddWord = true;
    this.nltkService.find(word, language).subscribe(
      res => this.findResults = res,
      er => console.log(er),
      () => {
        if (this.findResults.length === 0) {
          this.noResults = 'There was no match for this lemma.'
        } else {
          this.noResults = '';
        }

      }
    );
  }

  searchInPerseus(word: string) {
    this.noResults = '';
    this.findResults = [];
    this.disableAddWord = true;
    this.englishLemma.reset();
    this.perseus_lexicon_HTML = `http://www.perseus.tufts.edu/hopper/morph?l=${word}&la=gr`;
  }

  handleCheckBoxes(event, num: number) {
    if (event.target.checked) {
      this.word.synsets.push(this.findResults[num].wn_synset);
    } else {
      for (let i = this.word.synsets.length; i >= 0; i--) {
        if (this.word.synsets[i] === this.findResults[num].wn_synset) {
          // console.log('i will try to delete ' + this.findResults[num].wn_synset + ' at ' + i);
          this.word.synsets.splice(i, 1);
        }
      }
    }
    this.disableAddWord = this.word.synsets.length <= 0;
  }

  initWord() {
    this.word = new Word();
    this.word.synsets = [];
  }

  addWord() {
    if (this.submitLemma.valid) {
      let exists = false;
      this.word.word = this.submitLemma.get('input_text').value;
      for (let i = 0; i < this.words.length; i++) {
        if (this.words[i].word === this.word.word) {
          exists = true;
          this.words[i].synsets = this.word.synsets;
        }
      }
      if (!exists) {
        this.words.push(this.word);
      }
    }
    this.initWord();
    this.strikeThrough[this.wordIndex] = true;
    this.disableAddWord = true;
    this.findResults = [];
    this.disableSave = false;
  }

  get wordsAsArray() {
    return this.inscriptionForm.get('words') as FormArray;
  }

  getSynsetsAsArray(index: number) {
    return this.wordsAsArray.controls[index].get('synsets') as FormArray;
  }

  save() {
    if (this.inscriptionForm.valid && !this.disableSave) {
      for (let i = 0; i < this.words.length; i++) {
        this.wordsAsArray.push(this.createWordsField());
        for (let j = 0; j < this.words[i].synsets.length; j++) {
          this.getSynsetsAsArray(i).push(this.fb.control(''));
        }
      }
      this.inscriptionForm.get('words').patchValue(this.words);
      this.inscriptionForm.get('inscription_text').setValue(this.myForm.get('input_text').value);

      this.dbService.postInscription(this.inscriptionForm.value).subscribe(
        res => console.log(res)
      );

      this.inscriptionForm = this.fb.group(this.formPrepare);
      this.disableSave = true;
    } else {
      if (!this.inscriptionForm.valid) {
        this.errorMassage = 'Please put an inscription in text area.';
      } else {
        this.errorMassage = 'Add at least one word for the inscription';
      }
    }
  }

}
