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

  // Used for the Observable timer
  initialTimeBeforeDelay = 1000;
  periodBetweenEmits = 6000;


  constructor() {
  }

  ngOnInit() {
    //
    // Basic Observable
    // Chain map function on end of interval

    /**
     * A basic observable that emits a number every second.
     * The number that is emitted every second is then transformed by the map() which multiplies the number by 2.
     * @type {Observable<any>}
     */
    const myNumbers = Observable.interval(1000)
      .map(
        (data: number) => {
          return data * 2;
        }
       );


    /**
     * Emit numbers after an initial delay of 1000 milliseconds. The period between emits will be 2000 millisecionds.
     *
     * @type {Observable<number>}

     const myNumbers = Observable.timer(this.initialTimeBeforeDelay, this.periodBetweenEmits);
     */


    /**
     * Subscribes and prints the numbers of the Observable that is defined above.
     * @type {Subscription}
     */
    this.numberObsSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create(
      (observer: Observer<string>) => {
        // first callback
        setTimeout(() => {
          observer.next('first package');
        }, 2000);

        // second callback
        setTimeout(() => {
          observer.next('second package');
        }, 4000);

        // error?
        setTimeout( () => {
          observer.error('error has occurred');
        }, 4500);

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

  /**
   * Destroy the subscriptions when the user moves away from this component.
   */
  ngOnDestroy() {
    this.numberObsSubscription.unsubscribe();
    this.customNumberObsSubscription.unsubscribe();
  }
}

