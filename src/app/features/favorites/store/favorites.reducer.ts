import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';
import { Job } from '../../../core/models/job.model';

export interface FavoritesState {
  favorites: Job[];
  loading: boolean;
  error: any;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.loadFavorites, (state) => {
    console.log('Loading favorites...');
    return {
      ...state,
      loading: true,
    };
  }),
  on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => {
    console.log('Favorites loaded successfully:', favorites);
    return {
      ...state,
      loading: false,
      favorites,
    };
  }),
  on(FavoritesActions.loadFavoritesFailure, (state, { error }) => {
    console.error('Failed to load favorites:', error);
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(FavoritesActions.addFavorite, (state, { job }) => {
    console.log('Adding favorite:', job);
    return {
      ...state,
      favorites: [...state.favorites, job],
    };
  }),
  on(FavoritesActions.removeFavorite, (state, { jobId }) => {
    console.log('Removing favorite with ID:', jobId);
    return {
      ...state,
      favorites: state.favorites.filter((job) => job.id !== jobId),
    };
  })
);