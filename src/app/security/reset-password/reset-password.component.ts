/* Title: reset-password.component
Author: Megan Walker,  Ngi Bujri, Caitlynne Johnson
Date: 09-20-2023
Description: Reset password component
Source: Professor Krasso, Angular.io
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from '../security.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  errorMessage: string;
  email: string;
  isLoading: boolean = false;

  // reset password form group for the reset password component
  changePasswordForm: FormGroup = this.fb.group({
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])],
  });

  // constructor with form builder, security service, and activated route
  constructor(private fb: FormBuilder, private securityService: SecurityService, private route: ActivatedRoute, private router: Router) {
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
    this.errorMessage = '';

    //if the email is empty, navigate to the root page
    if (!this.email) {
      console.log('No email provided. Redirecting to root page.');
      this.router.navigate(['/']);
    }
  }

  // change password function that takes in the form values and calls the security service to change the password
  changePassword() {
    this.isLoading = true;

    const password = this.changePasswordForm.controls['password'].value;

    // call the security service to change the password
    this.securityService.changePassword(this.email, password).subscribe({
      // if successful, navigate to the sign in page
      next: (data) => {
        console.log(data);
        this.router.navigate(['/session/signin']);  // navigate to the sign in page
      },
      // if unsuccessful, display an error message
      error: (err) => {
        console.log(err);
        this.errorMessage = err
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
