// import { Injectable, OnDestroy, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map, tap } from 'rxjs/operators'

// import { RecipesService } from '../recipes/recipes.servise';
// import { Recipe } from '../recipes/recipe.model';
// import { Subscription } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class DataStoregeService { //implements OnInit, OnDestroy {
//     private DB_URL = 'https://angular-recipes-book-6b270-default-rtdb.firebaseio.com/recipes.json'
//     constructor(private http: HttpClient
//         , private recipesService: RecipesService
//     ) { }
//     // static recipesService = n/ew RecipesService();

//     private recipes: Recipe[] = [];
//     private recipesUpdateSubscription: Subscription;
//     ngOnInit() {
//         this.recipes = this.recipesService.getRecipes();
//         this.recipesUpdateSubscription = this.recipesService.recipesChanged.subscribe(
//             (ingredients: Recipe[]) => {
//                 this.recipes = ingredients;
//                 console.log('I heared that recipe list chaned:  IN THE DATA STOREGE');
//             }
//         )
//     }

//     ngOnDestroy() {
//         this.recipesUpdateSubscription.unsubscribe()
//     }

//     storeRecipes() {
//         // let localRecipes: Recipe[] = this.recipesService.getRecipes();
//         // this.recipesService.recipesChanged.subscribe(
//         //     recipes => {
//         //         localRecipes = recipes
//         //     }
//         // );
//         console.log('The recipes, from the reipes service', this.recipes)
//         this.http.put(this.DB_URL, this.recipes).subscribe((resp) => {
//             console.log(resp)
//         });
//     }

//     fetchRecipes() {
//         return this.http.get<Recipe[]>(this.DB_URL)
//             .pipe(map((recipes: Recipe[]) => {
//                 return recipes.map((recipe: Recipe) => {
//                     return {
//                         ...recipe,
//                         ingredients: recipe.ingredients ? recipe.ingredients : []
//                     }
//                 })
//             }), tap(recipes => {
//                 console.log(recipes);
//                 this.recipesService.setRecipes(recipes);
//             }))
//     }
// }