import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

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
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
  isEdit: boolean = false;

  ingForm = this.fb.group({
    name: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(1)]],
  })

  constructor(private shoppingListService: ShoppingListService, private fb: FormBuilder) { }

  ngOnInit() {
    this.selectedIngredientSubscription = this.shoppingListService.selectedIngredient
      .subscribe((index: number) => {
        this.editedIngredientIndex = index;
        this.editedIngredient = this.shoppingListService.getIngredientById(index);
        this.isEdit = true;
        this.ingForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      })
  }

  ngOnDestroy() {
    this.selectedIngredientSubscription.unsubscribe();
  }

  onAddIngredient() {
    const { name, amount } = this.ingForm.value;
    const newIngrediant: Ingredient = new Ingredient(name, amount);
    if (this.isEdit) {
      this.shoppingListService.updateIngredient(this.editedIngredientIndex, newIngrediant);
    } else {
      this.shoppingListService.addIngr(newIngrediant);
    }
    this.onClear();
  }

  onClear() {
    this.ingForm.reset();
    this.isEdit = false;
  }

  onDelete() {
    if (this.editedIngredientIndex !== undefined) {
      this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
      this.onClear();
    }
  }
}
