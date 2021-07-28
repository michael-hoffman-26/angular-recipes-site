import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

// @Injectable({ providedIn: 'root' })
// @Injectable()
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  selectedIngredient = new Subject<number>();
  private ingredients: Ingredient[] = [
    {
      name: 'Apples',
      amount: 5,
      id: '000'
    },
    {
      name: 'Tomatoes',
      amount: 10,
      id: '001'
    },
  ];

  getIngr() {
    return [...this.ingredients];
  }

  addIngr(ingr: Ingredient) {
    this.ingredients.push(ingr);
    this.ingredientChanged.next([...this.ingredients]);
  }

  getIngredientById(index: number) {
    return this.ingredients[index];
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next([...this.ingredients]);
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next([...this.ingredients]);
  }

  deleteIngredient(indexToDelete: number) {
    // this.ingredients = this.ingredients.filter((ingre: Ingredient, index: number) => {
    //   return index !== indexToDelete 
    // });
    this.ingredients.splice(indexToDelete, 1);
    this.ingredientChanged.next([...this.ingredients]);
  }
}