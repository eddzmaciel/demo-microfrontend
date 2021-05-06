import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

//import { EventBus } from '@trutoo/event-bus';

import { EventBus } from '@trutoo/event-bus';


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

  private subs: { unsubscribe(): void }[] = [];

  constructor(private http: HttpClient, private eventBus: EventBus) {
  }

  ngOnInit(): void {
    //console.log(this.emData);
    this.getCountries();
    //event bus
    this.generateEventBus();
  }

  generateEventBus() {
    this.eventBus.register('store:addToCart', { type: 'boolean' });
    this.subs.push(eventBus.subscribe<boolean>('store:newDeals', this.onNewDeals));
    this.onSend();
  }

  onNewDeals() {
    /* handle new deals ... */
    console.log('helloooooo!');
  }

  onSend() {
    this.eventBus.publish('store:addToCart', {
      name: 'Milk',
      amount: '1000 ml',
      price: 0.99,
      organic: true,
      stores: [
        {
          name: 'ACME Food AB',
          url: 'acme-food.com'
        }
      ]
    });
  }


  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }


  ngAfterViewInit() {
    //this.emView.nativeElement.emData = { token: '1-4$%65fgfgfsfsdf', userName: 'Edson Maciel' };
    console.log(this.emView);
    console.log("client height: " + this.emView.nativeElement.clientHeight);
    console.log("client width: " + this.emView.nativeElement.clientWidth);
    //this.generateEvent();
  }




  // generateEvent() {
  //   console.log('generating event');
  //   const myEventBus = new EventBus('my-event-bus');
  //   myEventBus.on('event-name', ({ detail }) => {
  //     document.body.append(detail + ' ');
  //   });
  //   myEventBus.once('event-name', ({ detail }) => {
  //     document.body.append(detail + ' ');
  //   });


  //   myEventBus.emit('event-name', 'hello');
  //   myEventBus.emit('event-name', 'world');
  // }



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
