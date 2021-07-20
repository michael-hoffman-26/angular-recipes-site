import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipe.model";

// @Injectable({ providedIn: 'root' })
@Injectable()
export class RecipesService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A',
    //         'This is simply a test',
    //         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Bread', 2)
    //         ]),
    //     new Recipe(
    //         'A Test Recipe',
    //         'This ',
    //         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //         [
    //             new Ingredient('Meat and bagel', 12),
    //             new Ingredient('Crumbles', 3)
    //         ])
    // ];

    private DB_URL = 'https://angular-recipes-book-6b270-default-rtdb.firebaseio.com/recipes.json'



    storeRecipes() {
        this.http.put(this.DB_URL, this.recipes).subscribe((resp) => {
            // console.log(resp)
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.DB_URL)
            .pipe(map((recipes: Recipe[]) => {
                return recipes.map((recipe: Recipe) => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                })
            }), tap(recipes => {
                this.setRecipes(recipes);
            }))
    }

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService,
        private http: HttpClient) {
    }

    getRecipes() {
        return [...this.recipes];
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next([...this.recipes]);
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipesChanged.next([...this.recipes]);
    }

    updateRecipe(recipeIndex: number, newRecipe: Recipe) {
        this.recipes[recipeIndex] = newRecipe;
        this.recipesChanged.next([...this.recipes]);
    }

    deleteRecipe(recipeIndex: number) {
        this.recipes.splice(recipeIndex, 1);
        this.recipesChanged.next([...this.recipes]);
    }
}