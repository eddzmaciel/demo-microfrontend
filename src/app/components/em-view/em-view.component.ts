import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";


// ####### EVENT BUS Native-----
// export class EventBus<DetailType = any>{
//   private eventTarget: EventTarget;
//   constructor(description = '') {
//     this.eventTarget = document.appendChild(document.createComment(description));
//   }
//   on(type, listener) {
//     this.eventTarget.removeEventListener(type, listener)
//   }
//   once(type, listener) {
//     this.eventTarget.addEventListener(type, listener, { once: true });
//   }
//   off(type, listener) {
//     this.eventTarget.removeEventListener(type, listener);
//   }
//   emit(type, detail) {
//     return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
//   }
// }

@Component({
  selector: 'app-em-view',
  templateUrl: './em-view.component.html',
  styleUrls: ['./em-view.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EmViewComponent implements AfterViewInit, OnInit {

  //define inputs and outputs
  @Input('emTitle') public emTitle: string = "Title in Microfrontend";
  @Input('emDescription') public emDescription: string = "Description in Microfrontend";
  @ViewChild("emView") emView: ElementRef;

  //event emmiter
  @Output('emCustomEvent') emCustomEvent: EventEmitter<any> = new EventEmitter<any>();

  //data object
  countriesList: any[] = [];

  //getting data from container app
  private _data: string;
  @Input('containerData') set containerData(data: string) {
    if (data) {
      this._data = data;
      console.log('showing data from web component!!!', this._data);
    }
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    //console.log(this.emData);
    this.getCountries();
    //event bus
    //this.generateEventBus();
  }

  ngOnDestroy() {

  }

  ngAfterViewInit() {
    // this.emView.nativeElement.emData = { token: '1-4$%65fgfgfsfsdf', userName: 'Edson Maciel' };
    console.log(this.emView);
    console.log("client height: " + this.emView.nativeElement.clientHeight);
    console.log("client width: " + this.emView.nativeElement.clientWidth);

  }


  onClick() {
    this.emCustomEvent.subscribe(event => {
      console.log('event :', event);
    });
  }

  getCountries() {
    this.http
      .get(`https://restcountries.eu/rest/v2/regionalbloc/NAFTA`)
      .subscribe((data: any) => {
        this.countriesList = data;

        console.log('--->countriesList: ', data);
      });
  }


}
