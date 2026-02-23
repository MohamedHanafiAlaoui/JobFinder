import { createAction, props } from '@ngrx/store';
import { Job } from '../../../core/models/job.model';

export const loadFavorites = createAction('[Favorites] Load Favorites');

export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Favorites Success',
  props<{ favorites: Job[] }>()
);

export const loadFavoritesFailure = createAction(
  '[Favorites] Load Favorites Failure',
  props<{ error: any }>()
);

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ job: Job }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ jobId: string }>()
);