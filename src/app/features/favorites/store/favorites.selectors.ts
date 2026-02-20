import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.reducer';

console.log('Initializing favorites selectors');

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

console.log('Favorites State Selector Initialized');

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (state) => {
    console.log('Accessing favorites state:', state);
    return state.favorites;
  }
);

export const selectFavoritesLoading = createSelector(
  selectFavoritesState,
  (state) => state.loading
);

export const selectFavoritesError = createSelector(
  selectFavoritesState,
  (state) => state.error
);