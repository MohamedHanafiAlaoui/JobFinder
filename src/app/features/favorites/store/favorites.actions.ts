import { createAction, props } from '@ngrx/store';
import { Job } from '../../../core/models/job.model';

// Action to load favorites
export const loadFavorites = createAction('[Favorites] Load Favorites');

// Action to load favorites success
export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Favorites Success',
  props<{ favorites: Job[] }>()
);

// Action to load favorites failure
export const loadFavoritesFailure = createAction(
  '[Favorites] Load Favorites Failure',
  props<{ error: any }>()
);

// Action to add a job to favorites
export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ job: Job }>()
);

// Action to remove a job from favorites
export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ jobId: string }>()
);