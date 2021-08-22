import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { addToShoppinList } from 'src/app/shopping-list/store/shopping-list.actions';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private store: Store) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipesService.getRecipe(this.id);
      }
    );
  }

  handleToShoppingList() {
    this.store.dispatch(addToShoppinList({ newIngredients: this.recipe.ingredients }))
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id);
  }

}
