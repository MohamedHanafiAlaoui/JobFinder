import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guard/auth.guard';
import { jobsResolver } from './core/resolvers/job.resolver';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile.component').then(m => m.ProfileComponent)
  },

  {
    path: 'jobs',
    resolve: { list: jobsResolver },
    loadChildren: () =>
      import('./features/jobs/jobs.routes').then(m => m.JOBS_ROUTES)
  },

  {
    path: 'favorites',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/favorites/favorites-list/favorites-list.component').then(m => m.FavoritesListComponent)
  },
  {
    path:"candidatures",
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/candidatures/candidatures.component').then(m => m.CandidaturesComponent)
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];
