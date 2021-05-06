import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmViewComponent } from './components/em-view/em-view.component';
//using my http client module for angular
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    EmViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //bootstrap: [AppComponent] 
})
export class AppModule {

  constructor(private injector: Injector) {

  }

  ngDoBootstrap() {
    const customElement = createCustomElement(EmViewComponent, { injector: this.injector });
    //define the name for the custom element
    customElements.define('em-view', customElement);
  }


}
