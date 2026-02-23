import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as FavoritesActions from './favorites.actions';
import { FavoriteService } from '../../../core/services/favorite/favorite.service';
import { Job } from '../../../core/models/job.model';

@Injectable()
export class FavoritesEffects {
  constructor(
    private actions$: Actions,
    private favoriteService: FavoriteService
  ) {}

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.loadFavorites),
      mergeMap(() =>
        this.favoriteService.getFavorites().pipe(
          map((favorites: Job[]) => FavoritesActions.loadFavoritesSuccess({ favorites })),
          catchError((error) => of(FavoritesActions.loadFavoritesFailure({ error })))
        )
      )
    )
  );
}