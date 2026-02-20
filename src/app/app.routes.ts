import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { favoritesReducer } from './features/favorites/store/favorites.reducer';
import { FavoritesEffects } from './features/favorites/store/favorites.effects';
import { authGuard } from './core/guard/auth.guard';
import { jobsResolver } from './core/resolvers/job.resolver';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
{ path: 'auth/login', component: LoginComponent, canActivate: [authGuard] },
 { path: 'auth/register', component: RegisterComponent, canActivate: [authGuard] },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile.component')
        .then(m => m.ProfileComponent)
  },

  {
    path: 'jobs',
    resolve: { list: jobsResolver },
    loadChildren: () =>
      import('./features/jobs/jobs.routes')
        .then(m => m.JOBS_ROUTES)
  },

  {
    path: 'favorites',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/favorites/favorites-list/favorites-list.component')
        .then(m => m.FavoritesListComponent),
    providers: [
      provideState('favorites', favoritesReducer),
      provideEffects(FavoritesEffects),
    ],
  },

  {
    path: 'candidatures',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/candidatures/candidatures.component')
        .then(m => m.CandidaturesComponent)
  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];
