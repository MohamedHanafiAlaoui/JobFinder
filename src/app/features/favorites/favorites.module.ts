import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { favoritesReducer } from './store/favorites.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('favorites', favoritesReducer),
  ],
})
export class FavoritesModule {}