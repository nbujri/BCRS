/* Title: reset-password.component
Author: Megan Walker,  Ngi Bujri, Caitlynne Johnson
Date: 09-20-2023
Description: Reset password component
Source: Professor Krasso, Angular.io
 */

// import statements
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from '../security.service';

// component details
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

// export class ResetPasswordComponent implements OnInit
export class ResetPasswordComponent {
  errorMessage: string
  email: string
  isLoading: boolean = false

  // change password form group for the reset password component
  changePasswordForm: FormGroup = this.fb.group({
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
        ),
      ]),
    ],
  })

  // constructor with form builder, security service, router, and activated route
  constructor(private fb: FormBuilder, private securityService: SecurityService, private route: ActivatedRoute, private router: Router) {
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '' // get the email address from the query parameters
    this.errorMessage = '' // set the error message to an empty string

    // if the email address is not found, redirect to the signin page
    if (!this.email) {
      console.log('No email address found')
      this.router.navigate(['/security/signin'])
    }
  }

  // change password function that takes in the form values and calls the security service to change the password
  changePassword() {
    this.isLoading = true
    const password = this.changePasswordForm.controls['password'].value

    this.securityService.changePassword(this.email, password).subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigate(['/security/signin'])
      },

      // if the call is unsuccessful, display an error message
      error: (err) => {
        console.log(err)
        this.errorMessage = err
        this.isLoading = false
      },

      // if the call is successful, display a message
      complete: () => {
        this.isLoading = false
      }
    })
  }
}
