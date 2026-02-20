import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { FavoritesEffects } from './features/favorites/store/favorites.effects';

console.log('Registering favoritesReducer with key: favorites');

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(),
    provideEffects([FavoritesEffects]),
    provideStoreDevtools({ maxAge: 25 })
  ]
});