import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { NltkService } from "./services/nltk.service";

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center">
      <h1 *ngIf="title">
        {{title}}
      </h1>
      <div *ngIf="myForm">
        <form [formGroup]="myForm">
          <textarea formControlName="input_text"></textarea>
          <button type="submit" (click)="sendTextToBack()">GO</button>
        </form>
      </div>
      <div *ngIf="result">
        <span *ngFor="let w of result"><a (click)="getLemma(w)">{{ w }} </a></span>
      </div>
    </div>
    <div *ngIf="perseus_lexicon_HTML">
      <iframe [src]="perseus_lexicon_HTML | sanitize_url" style="width: 90%; height: 900px; border: 1px solid black"></iframe>
    </div>
<!--    <router-outlet></router-outlet>-->
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title: string;
  myForm: FormGroup;
  result: string[];
  perseus_lexicon_HTML: any;

  constructor(private nltkService: NltkService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({ input_text: [''] });
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
