import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import {UsersService} from './users.service';
import { IngredientsComponent } from './ingredients/ingredients.component';
import {IngredientsService} from './ingredients/ingredients.service';
import { IngredientComponent } from './src/app/ingredients/ingredient/ingredient.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    IngredientsComponent,
    IngredientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [UsersService, IngredientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
