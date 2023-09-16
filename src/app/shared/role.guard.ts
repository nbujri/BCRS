/* Title: role.guard
Author: Megan Walker
Date: 09-13-2023
Description: role guard for BCRS
Source: Professor Krasso, Angular.io */

// imports
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

// role guard function
export const roleGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);

  // get session user
  let sessionUser = JSON.parse(cookie.get('session_user'));

  console.log('Session User:', sessionUser); // for troubleshooting purposes

  // if no session user, redirect to sign in
  if (!sessionUser) {
    console.log('You must be logged in to access this page!');
    const router = inject(Router);
    router.navigate(['/security/signin'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  // if session user is not an admin, redirect to home
  if (sessionUser.role !== 'admin') {
    console.log('you must be an admin to access this page!');
    const router = inject(Router);
    router.navigate(['/']);
    return false;
  }

  // if session user is an admin, allow access
  return true;
};
