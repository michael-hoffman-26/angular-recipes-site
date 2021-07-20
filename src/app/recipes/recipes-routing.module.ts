import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoRecipeSelectedComponent } from '../recipes/no-recipe-selected/no-recipe-selected.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeResolver } from '../recipes/recipes-resolver.service';
import { RecipesComponent } from '../recipes/recipes.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        resolve: [RecipeResolver],
        canActivate: [AuthGuard],
        children: [
            { path: '', component: NoRecipeSelectedComponent },
            { path: 'new', component: RecipeEditComponent },
            {
                path: ':id',
                component: RecipeDetailComponent,
                // resolve: [RecipeResolver]
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                // resolve: [RecipeResolver]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }