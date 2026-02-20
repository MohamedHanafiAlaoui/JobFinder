import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = auth.isAuthenticated();
  const isAuthPage = state.url.startsWith('/auth');

  if (isLoggedIn && isAuthPage) {
    return router.createUrlTree(['/profile']);
  }

  if (!isLoggedIn && !isAuthPage) {
    return router.createUrlTree(['/auth/login']);
  }

  return true;
};
