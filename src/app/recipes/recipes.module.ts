import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { NoRecipeSelectedComponent } from "./no-recipe-selected/no-recipe-selected.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        NoRecipeSelectedComponent,
        RecipeEditComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule { }