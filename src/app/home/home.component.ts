/* Title: home.component
Author: Megan Walker,  Ngi Bujri, Caitlynne Johnson
Date: 09-14-2023
Description: home component for BCRS
Source: Professor Krasso, Angular.io */

// imports statements
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe],
})
export class HomeComponent {
  myDate = Date.now();
  cookie;

  constructor(private cookieService: CookieService) {
    // get session_user cookie to access user's email
    this.cookie = JSON.parse(this.cookieService.get('session_user'));
    console.log('cookie: ', this.cookie);
  }
}
