import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.servise';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipesChangedListner: Subscription;
  recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
    this.recipesChangedListner = this.recipesService.recipesChanged.subscribe(
      newRecipes => {
        this.recipes = newRecipes
      }
    )
  }

  ngOnDestroy() {
    this.recipesChangedListner.unsubscribe();
  }


}
