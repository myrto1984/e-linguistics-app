import { Component, OnInit } from '@angular/core';
import { MainService } from "./services/main.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NltkService } from "./services/nltk.service";

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
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
        <ul>
          <li *ngFor="let w of result">{{ w }}</li>
        </ul>
      </div>
    </div>
<!--    <router-outlet></router-outlet>-->
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title: string;
  myForm: FormGroup;
  result: string[];

  constructor(private mainService: MainService,
              private nltkService: NltkService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getWelcome();
    this.initForm();
  }

  getWelcome() {
    this.mainService.getWelcome().subscribe(
        msg => this.title = msg,
        er => console.log(er)
    );
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

}
