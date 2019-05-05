import {Component, OnInit} from '@angular/core';
import {MainService} from "./services/main.service";

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <h1 *ngIf="title">
        {{title}}
      </h1>
    </div>
<!--    <router-outlet></router-outlet>-->
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title: string;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.getWelcome();
  }

  getWelcome() {
    this.mainService.getWelcome().subscribe(
        msg => this.title = msg,
        er => console.log(er)
    );
  }

}
