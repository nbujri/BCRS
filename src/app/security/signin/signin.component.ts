/* Title: signin.component
Author: Megan Walker, Ngi Bujri, Caitlynne Johnson
Date: 09-14-2023
Description: signin component for BCRS
Source: Professor Krasso, Angular.io */


import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute , Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {
  errorMessage: string;
  isLoading: boolean = false;

  signinForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])]
    password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])]
  })




}
