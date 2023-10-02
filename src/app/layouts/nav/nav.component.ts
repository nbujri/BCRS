/**
 * Title: nav.component.ts
 * Modified by: Caitlynne Johnson
 * Date: 9/13/23
 */

// imports statements
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export interface SessionUser {
  fullName: string;
  role: string;
  email: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  sessionUser: SessionUser;
  isSignedIn: boolean;

  constructor(private cookieService: CookieService) {
    this.sessionUser = {} as SessionUser;
    this.isSignedIn = this.cookieService.get('session_user') ? true : false;

    if (this.isSignedIn) {
      this.sessionUser = JSON.parse(this.cookieService.get('session_user'));
      console.log('Session User:', this.sessionUser);
    }
  }

  signout() {
    this.cookieService.deleteAll();
    window.location.href = '/';
  }
}
