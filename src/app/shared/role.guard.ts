/* Title: role.guard
Author: Megan Walker
Date: 09-13-2023
Description: role guard for BCRS
Source: Professor Krasso, Angular.io */


// imports
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

// roleGuard function
export const roleGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);

  // get session user
  let sessionUser = cookie.get('session_user');

  console.log(sessionUser);

  // if session user is not logged in, redirect to signin page
  if (!sessionUser) {
    console.log('You must be logged in to access this page.');
    const router = inject(Router);
    router.navigate(['/session/signin'], { queryParams: { returnUrl: state.url } })
    return false;
  }

  // if session user is logged in, check role
  if sessionUser.role === 'admin' {
    return false;
  }

};
