import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Ingredient } from 'src/app/shared/ingredient.model';

export enum ShoppingListActionTypes {
    FetchShoppingList = '[ShoppinList] Fetch Shopping List',
    UpdateShoppinList = '[ShoppinList] Update Shopping List',
    DeleteShoppingList = '[ShoppinList] Delete Shopping List',
    AddToShoppingList = '[ShoppinList] Add To Shopping List',
    UpdateSelectedIngrId = '[ShoppinList] Update Selected Ingr Id',
}

export const fetchShoppinList = createAction(
    ShoppingListActionTypes.FetchShoppingList,
    props<{ ingredients: Ingredient[] }>()
);
export const updateShoppinList = createAction(
    ShoppingListActionTypes.UpdateShoppinList,
    props<{ updatedIngredient: Ingredient }>()
);
export const deleteShoppinList = createAction(
    ShoppingListActionTypes.DeleteShoppingList
);
export const addToShoppinList = createAction(
    ShoppingListActionTypes.AddToShoppingList,
    props<{ newIngredients: Ingredient[] }>()
);
export const updateSelectedIngrId = createAction(
    ShoppingListActionTypes.UpdateSelectedIngrId,
    props<{ selectedIngId: string }>()
);