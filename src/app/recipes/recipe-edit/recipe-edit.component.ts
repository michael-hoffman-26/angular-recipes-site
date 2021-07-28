import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.servise';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipe: Recipe = null
  formIngredientsArray: FormArray = this.fb.array([])

  editRecipeForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required]
    ],
    imagePath: ['', [Validators.required]],
    description: ['', [Validators.required]],
    ingredients: this.formIngredientsArray
  });

  createIngredient(ingredient: Ingredient): FormGroup {
    return this.fb.group({
      name: [ingredient.name, [Validators.required]],
      amount: [ingredient.amount, [Validators.required, Validators.min(1)]],
      id: [ingredient.id] // We need the value in the form.value... so I added it here
    });
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] !== undefined;
        if (this.editMode) {
          this.recipe = this.recipeService.getRecipe(this.id);
          this.editRecipeForm.patchValue({
            name: this.recipe.name,
            description: this.recipe.description,
            imagePath: this.recipe.imagePath,
          })
          this.recipe.ingredients.forEach(ingr => {
            this.formIngredientsArray.push(this.createIngredient(ingr))
          })
        }
      }
    );
  }

  onDeleteIngredient(ingrIndex: number) {
    this.formIngredientsArray.removeAt(ingrIndex);
  }

  onSubmit() {
    this.editMode ?
      this.recipeService.updateRecipe(this.id, this.editRecipeForm.value)
      : this.recipeService.addRecipe(this.editRecipeForm.value);
  }

  get ingrControls() {
    return (<FormArray>this.editRecipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    this.formIngredientsArray.push(
      this.createIngredient({ name: '', amount: 1, id: new Date().toString() })
    )
  }

  onCancel() {

  }
}
