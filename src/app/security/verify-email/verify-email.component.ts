/* Title: verify-email.component
Author: Megan Walker  Ngi Bujri, Caitlynne Johnson
Date: 09-20-2023
Description: Verify email component
Source: Professor Krasso, Angular.io */

// imports from angular and our custom files
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from '../security.service';

// component details
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})

// export the component details
export class VerifyEmailComponent {
  errorMessage: string // error message variable
  isLoading: boolean = false // loading variables

  // email form group for the verify email form
  emailForm: FormGroup = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])]
  })

  // constructor with form builder, router, and security service parameters
  constructor(private fb: FormBuilder, private router: Router, private securityService: SecurityService) {
    this.errorMessage = ''
  }

  // verifyEmail function to verify the email address entered by the user
  verifyEmail() {
    this.isLoading = true // set the isLoading variable to true

    const email = this.emailForm.controls['email'].value

    // call the security service verifyEmail function to verify the email address
    this.securityService.verifyEmail(email).subscribe({

      // if the email address is found, navigate to the verify security questions page
      next: (res) => {
        //console.log(res)
        this.router.navigate(['security/verify-security-questions'], { queryParams: { email }, skipLocationChange: true }) // navigate to the verify security questions while hiding the email in the navigation link bar
      },

      // if there is an error, log the error to the console
      error: (err) => {
        console.log('Server Error from verifyEmail Call:', err)

        // if the error status is 404, assign the error message
        if (err.status === 404) {
          this.errorMessage = 'The email address you entered was not found. Please try again'
          return
        }

        // if the error status is 500, assign the error message
        this.errorMessage = 'There was a problem verifying your email address. Please try again later.'
        this.isLoading = false
      },

      // if the call is complete, set the isLoading variable to false
      complete: () => {
        this.isLoading = false
      }
    })
  }
}
