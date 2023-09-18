/* Title: home.component
Author: Megan Walker,  Ngi Bujri, Caitlynne Johnson
Date: 09-14-2023
Description: home component for BCRS
Source: Professor Krasso, Angular.io */

// imports statements
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent {
  myDate = Date.now();
}
