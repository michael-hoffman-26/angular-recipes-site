import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    ShoppingListRoutingModule
  ]
})
export class ShoppingListModule { }