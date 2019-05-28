import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NltkService} from "../../services/nltk.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  myForm: FormGroup;
  result: string[];
  perseus_lexicon_HTML: any;

  constructor(private nltkService: NltkService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({input_text: ['']});
  }

  sendTextToBack() {
    if (this.myForm.valid) {
      this.nltkService.tokenizeText(this.myForm.value).subscribe(
        res => this.result = res,
        er => console.log(er)
      );
    }
  }

  getLemma(word: string) {
    this.perseus_lexicon_HTML = `http://www.perseus.tufts.edu/hopper/morph?l=${word}&la=gr`;
  }
}
