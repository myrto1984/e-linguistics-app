import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NltkService} from "../../services/nltk.service";
import {CltkService} from "../../services/cltk.service";
import {findResults, word} from "../../domain/collections-models";

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
  result: string[];
  lemmas: string[];
  findResults: findResults[];
  words: word[] = [];
  word: word;
  disableAddWord = true;
  disableSave = true;
  noResults: string;
  perseus_lexicon_HTML: any;

  constructor(private nltkService: NltkService,
              private cltkService: CltkService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initWord();
  }

  initForm() {
    this.myForm = this.fb.group({input_text: ['', Validators.required]});
    this.englishLemma = this.fb.group({input_text: ['', Validators.required]});
  }

  sendTextToBack() {
    this.errorMassage = '';
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
    // this should probably go somewhere else
    this.submitLemma = this.fb.group({input_text: ['', Validators.required]});
    this.noResults = '';
    this.perseus_lexicon_HTML = '';
    this.lemmas = [];
    this.cltkService.lemmatizeText(lemma).subscribe(
      res => {
        this.lemmas = res;
        this.submitLemma.get('input_text').setValue(this.lemmas[0]);
      },
      er => console.log(er)
    );
  }

  getLemma(word: string, language: string) {
    this.perseus_lexicon_HTML = '';
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
    this.word = new word();
    this.word.synsets = [];
  }

  addWord() {
    if (this.submitLemma.valid) {
      let exists = false;
      this.word.word = this.submitLemma.get('input_text').value;
      for (let i = 0; i < this.words.length; i++) {
        if (this.words[i].word === this.word.word) {
          exists = true;
          if (this.words[i].synsets !== this.word.synsets) {
            console.log('synsets dont match');
          }
          console.log('found ya');
        }
      }
      if (!exists) {
        console.log('push');
        let temp: word;
        temp = this.word;
        this.words.push(temp);
        this.word = new word();
      }
    }
    console.log(this.words);
    this.initWord();
    this.findResults = [];
  }

}
