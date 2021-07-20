import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingredientsUpdateSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngr();
    this.ingredientsUpdateSubscription = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
  }

  handleAddIngr(event: Ingredient) {
    this.ingredients.push(event);
    console.log('in shopping list:', event)
  }

  ngOnDestroy(): void {
    this.ingredientsUpdateSubscription.unsubscribe();
  }

  onIngredientSelected(index: number): void {
    this.shoppingListService.selectedIngredient.next(index);
  }

}
