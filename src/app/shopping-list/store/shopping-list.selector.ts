import { createSelector } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

import { AppState } from "src/app/store/app.reducer";
import { ShoppinListState } from "./shopping-list.reducer";

export const selectShoppingListIngr = createSelector(
    (state: AppState) => state.shoppingList,
    (shoppingListState: ShoppinListState) => {
        return shoppingListState.ingredients
    }
);

export const selectSelectedIngrId = createSelector(
    (state: AppState) => state.shoppingList,
    (shoppingListState: ShoppinListState) => {
        return shoppingListState.selectedIngredientId
    }
);

export const selectSelectedIngr = createSelector(
    selectShoppingListIngr,
    selectSelectedIngrId,
    (allIngr: Ingredient[], selectedIngId: string) => {
        return allIngr.find(ingr => ingr.id === selectedIngId)
    }
);