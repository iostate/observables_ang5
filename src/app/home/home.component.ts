import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  numberObsSubscription: Subscription;
  customNumberObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {

    // Basic Observable
    const myNumbers = Observable.interval(1000);
    this.numberObsSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const OK = 'blah blah blah';

    const myObservable = Observable.create((observer: Observer<string>) => {
      // first callback
      setTimeout(() => {
        observer.next('first package');
      }, 2000);

      // second callback
      setTimeout(() => {
        observer.next('second package');
      }, 4000);

      // completed
      setTimeout(() => {
        observer.complete();
      }, 5000);

      // third callback - will never emit this since its after completed
      setTimeout(() => {
        observer.next('third package');
      }, 6000);
    });

    // subscribe to the callbacks
    this.customNumberObsSubscription = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('completed');
      },
    );

  }

  ngOnDestroy() {
    this.numberObsSubscription.unsubscribe();
    this.customNumberObsSubscription.unsubscribe();
  }



}

