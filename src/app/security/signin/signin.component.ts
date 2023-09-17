/* Title: signin.component
Author: Megan Walker, Ngi Bujri, Caitlynne Johnson
Date: 09-14-2023
Description: signin component for BCRS
Source: Professor Krasso, Angular.io */

// imports
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from './../security.service';

// export component class for signin
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

// export class for signin
export class SigninComponent {
  errorMessage: string
  isLoading: boolean = false

  // signin form validation
  signinForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])]
  })

  // constructor for signin
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private secService: SecurityService,
    private route: ActivatedRoute
  ) {
    this.errorMessage = ''
  }

  // signin function for user
  signin() {
    this.isLoading = true;

    console.log('Sign in Form:', this.signinForm.value)


    // get email and password from form controls
    let email = this.signinForm.controls['email'].value
    let password = this.signinForm.controls['password'].value


    // if email or password is empty, display error message
    if (!email || !password) {
      this.errorMessage = 'Please provide an email address and password'
      this.isLoading = false;
      return
    }

    // if email or password is invalid, display error message
    this.secService.signin(email, password).subscribe({
      next: (user: any) => {
        console.log('User:', user)


        // set session user cookie
        const sessionCookie = {
          fullName: `${user.firstName} ${user.lastName}`,
          role: user.role,
          email: user.email
        }

        // set session user cookie for 1 day
        this.cookieService.set('session_user', JSON.stringify(sessionCookie), 1)

        // get return url from route parameters or default to '/'
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'

        // if user is not admin, redirect to home page
        this.isLoading = false

        // if user is admin, redirect to admin page
        this.router.navigate([returnUrl])
      },

      // if error, display error message
      error: (err) => {
        this.isLoading = false

        // if error status is 401, display error message
        console.log('err', err)

        if (err.error.status === 401) {
          this.errorMessage = err.error.message
          return
        }
      }
    })

  }
}