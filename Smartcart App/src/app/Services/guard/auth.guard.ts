import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token') || '';

  const jwtToken = token ? JSON.parse(token) : '' || null;

  return jwtToken ? true : inject(Router).createUrlTree(['/']);
};
