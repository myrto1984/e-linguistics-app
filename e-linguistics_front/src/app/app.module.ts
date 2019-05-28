import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {NltkService} from "./services/nltk.service";
import {SanitizeUrlPipe} from "./pipes/url-santizer.pipe";
import {HomeComponent} from "./pages/home/home.component";
import {HeaderComponent} from "./pages/persistent/header.component";
import {FooterComponent} from "./pages/persistent/footer.component";
import {CltkService} from "./services/cltk.service";

@NgModule({
  declarations: [
    AppComponent,
    SanitizeUrlPipe,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    NltkService,
    CltkService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
}
