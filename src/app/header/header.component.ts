import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

import { RecipesService } from '../recipes/recipes.servise';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private recipeService: RecipesService,
    private autService: AuthService) {

  }

  ngOnInit() {
    this.userSub = this.autService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.recipeService.storeRecipes();
  }

  onFetchData() {
    this.recipeService.fetchRecipes().subscribe(res => {
    });
  }

  handleLogOut() {
    this.autService.logout();
  }
}
