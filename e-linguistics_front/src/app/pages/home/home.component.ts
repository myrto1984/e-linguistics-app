import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {findResults, NltkService} from "../../services/nltk.service";
import {CltkService} from "../../services/cltk.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
  errorMassage: string;
  myForm: FormGroup;
  submitLemma: FormGroup;
  result: string[];
  lemmas: string[];
  findResults: findResults[];
  noResults: string;
  perseus_lexicon_HTML: any;

  constructor(private nltkService: NltkService,
              private cltkService: CltkService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({input_text: ['', Validators.required]});
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
    }
    else {
      this.errorMassage = 'Please put an inscription in text area.';
    }
  }

  lemmatize(lemma: string) {
    // this should probably go somewhere else
    this.submitLemma = this.fb.group({input_text: ['', Validators.required]});
    this.noResults = '';
    this.perseus_lexicon_HTML = '';
    this.lemmas = [];
    this.perseus_lexicon_HTML = '';
    this.cltkService.lemmatizeText(lemma).subscribe(
      res => {
        this.lemmas = res;
      },
      er => console.log(er)
    );
  }

  getLemma(word: string, language:string) {
    this.perseus_lexicon_HTML = '';
    this.nltkService.find(word, language).subscribe(
      res => this.findResults = res,
      er => console.log(er),
      () => {
        if (this.findResults.length === 0) {
          this.noResults = 'There was no match for this lemma.'
        }
        else {
          this.noResults = '';
        }
      }
    );
  }

  searchInPerseus(word: string) {
      this.noResults = '';
      this.perseus_lexicon_HTML = `http://www.perseus.tufts.edu/hopper/morph?l=${word}&la=gr`;
  }


  handleCheckBoxes(event, num: number) {
    if(event.target.checked) {
      console.log('just checked row ' + num);
    } else {
      console.log('just unchecked row ' + num);
    }
  }
}
