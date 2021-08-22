import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Recipe } from "./recipe.model";
import { RecipesService } from "./recipes.service";

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipe[]> {
    recipes: Recipe[] = [];
    constructor(
        private recipeService: RecipesService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0) {
            return this.recipeService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}