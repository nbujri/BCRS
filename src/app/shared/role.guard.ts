/* Title: role.guard
Author: Megan Walker
Date: 09-13-2023
Description: role guard for BCRS
Source: Professor Krasso, Angular.io */


// imports
import { CanActivateFn } from '@angular/router';

// roleGuard function
export const roleGuard: CanActivateFn = (route, state) => {
  return true;
};
