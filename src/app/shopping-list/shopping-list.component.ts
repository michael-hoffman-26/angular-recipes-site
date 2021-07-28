import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { AppState } from '../store/app.reducer';
import { ShoppingListService } from './shopping-list.service';
import { selectShoppingListIngr, selectSelectedIngrId } from './store/shopping-list.selector';
import { updateSelectedIngrId } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent {
  ingredients$: Observable<Ingredient[]> = this.store.pipe(select(selectShoppingListIngr));
  selectedIngrId$: Observable<string> = this.store.pipe(select(selectSelectedIngrId));

  constructor(private store: Store<AppState>) { }

  onIngredientSelected(ingrId: string): void {
    this.store.dispatch(updateSelectedIngrId({ selectedIngId: ingrId }))
  }

}
