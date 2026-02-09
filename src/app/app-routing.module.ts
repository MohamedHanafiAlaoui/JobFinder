import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) }, { path: 'jobs', loadChildren: () => import('./features/jobs/jobs.module').then(m => m.JobsModule) }, { path: 'favorites', loadChildren: () => import('./features/favorites/favorites.module').then(m => m.FavoritesModule) }, { path: 'applications', loadChildren: () => import('./features/applications/applications.module').then(m => m.ApplicationsModule) }, { path: 'profile', loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
