import { createReducer, on } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import {
    addToShoppinList,
    deleteShoppinList,
    fetchShoppinList,
    updateSelectedIngrId,
    updateShoppinList
} from './shopping-list.actions';

export interface ShoppinListState {
    selectedIngredientId: string,
    ingredients: Ingredient[]
}

export const initialState: ShoppinListState = {
    selectedIngredientId: null,
    ingredients: [
        {
            name: 'Apples',
            amount: 5,
            id: '0'
        },
        {
            name: 'Tomatoes',
            amount: 10,
            id: '1'
        }
    ]
};

const _shoppingListReducer = createReducer(
    initialState,
    on(fetchShoppinList, (state: ShoppinListState, { ingredients }) => {
        return {
            ...state,
            ingredients
        }
    }),
    on(updateShoppinList, (state: ShoppinListState, { updatedIngredient }) => {
        return {
            ...state,
            ingredients: state.ingredients.map((ingredient: Ingredient) => {
                return ingredient.id === updatedIngredient.id ?
                    updatedIngredient
                    : ingredient
            })
        }
    }),
    on(deleteShoppinList, (state: ShoppinListState) => {
        return {
            ...state,
            ingredients: state.ingredients.filter((ingr: Ingredient) => {
                return ingr.id !== state.selectedIngredientId
            })
        }
    }),
    on(addToShoppinList, (state: ShoppinListState, { newIngredients }) => {
        return {
            ...state,
            ingredients: state.ingredients.concat(...newIngredients)
        }
    }),
    on(updateSelectedIngrId, (state: ShoppinListState, { selectedIngId }) => {
        return {
            ...state,
            selectedIngredientId: selectedIngId
        }
    })
);

export function shoppingListReducer(state: ShoppinListState, action) {
    return _shoppingListReducer(state, action);
}
