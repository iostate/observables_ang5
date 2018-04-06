import {Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from './ingredients.model';
import {IngredientsService} from './ingredients.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Observer} from 'rxjs/Observer';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})


export class IngredientsComponent implements OnInit, OnDestroy {
  obsSubscription: Subscription;
  customObsSubscription: Subscription;

  ingredients: Ingredient[];

  currentIngName: string;

  constructor(private ingService: IngredientsService) {
  }

  ngOnInit() {

    // Load ingredients into local property and subscribe
    this.ingredients = this.ingService.getIngredients();
    this.ingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );


    // observable that emits numbers
    const myNumbers = Observable.interval(1000);
    // subscribe to it
    this.obsSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );


    // Observer
    const myObservable = Observable.create(
      (observer: Observer<Ingredient>) => {


        setTimeout( () => {
          observer.next(this.ingredients[0]);
        }, 2000);

        setTimeout( () => {
          observer.next(this.ingredients[1]);
        }, 3000);

        // emit an error
        setTimeout( () => {
          observer.error('there was an error');
        }, 3500);

        setTimeout( () => {
          observer.complete();
        }, 4000);
      }
    );

    // Subscribe to Observer
    this.customObsSubscription = myObservable.subscribe(
      (ingredient: Ingredient) => {
        console.log(ingredient.name);

        // Set current Ingredient name to this name
        this.currentIngName = ingredient.name;

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
    this.obsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }

}
