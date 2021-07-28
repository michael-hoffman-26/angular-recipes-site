import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { addToShoppinList, updateShoppinList, deleteShoppinList, updateSelectedIngrId } from '../store/shopping-list.actions';
import { selectSelectedIngr } from '../store/shopping-list.selector';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output('temp') addIngerdiant = new EventEmitter<Ingredient>();

  // @ViewChild('f', { static: true }) ingForm: NgForm;
  // @ViewChild('amountInput', {static: true}) amoountInput: ElementRef;
  selectedIngredientSubscription: Subscription;
  isEdit: boolean = false;

  selectedIngrIdFromStat$ = this.store.pipe(select(selectSelectedIngr));
  // getIngrSubscription = (id) => this.store.pipe(select(getIngredientById(id)));

  selectedIngrFromState$: Ingredient;

  ingForm = this.fb.group({
    name: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(1)]],
  })

  constructor(
    private fb: FormBuilder,
    private store: Store) { }

  ngOnInit() {
    this.selectedIngredientSubscription = this.selectedIngrIdFromStat$.subscribe(selectedIngrId => {
      if (selectedIngrId) {
        this.selectedIngrFromState$ = selectedIngrId;
        this.isEdit = true;
        this.ingForm.setValue({
          name: selectedIngrId.name,
          amount: selectedIngrId.amount
        });
      }
    });
  }


  ngOnDestroy() {
    this.selectedIngredientSubscription.unsubscribe();
  }


  onAddOrUpdateIngredient() {
    const { name, amount } = this.ingForm.value;
    const newIngredient: Ingredient = {
      name,
      amount,
      id: this.isEdit ? this.selectedIngrFromState$.id : new Date().toString()
    };
    if (this.isEdit) {
      this.store.dispatch(updateShoppinList(
        {
          updatedIngredient: newIngredient
        }
      ));
    } else {
      this.store.dispatch(addToShoppinList({ newIngredients: [newIngredient] }));
    }
    this.onClear();
  }

  onClear() {
    this.ingForm.reset();
    this.isEdit = false;
    this.store.dispatch(updateSelectedIngrId(null));

  }

  onDelete() {
    if (this.selectedIngrFromState$ !== undefined) {
      this.store.dispatch(deleteShoppinList());
      this.onClear();
    }
  }
}
