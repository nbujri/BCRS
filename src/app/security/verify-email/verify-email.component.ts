/* Title: verify-email.component
Author: Megan Walker  Ngi Bujri, Caitlynne Johnson
Date: 09-20-2023
Description: Verify email component
Source: Professor Krasso, Angular.io */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})

// export class VerifyEmailComponent implements OnInit
export class VerifyEmailComponent {
  errorMessage: string
  isLoading: boolean = false;

  // email form group for the verify email component
  emailForm: FormGroup = this.fb.group({
    email: [null, [Validators.compose([Validators.required, Validators.email])]]
  });

  //constructor with form builder, router, and security service
  constructor(private fb: FormBuilder, private router: Router, private securityService: SecurityService) {
    this.errorMessage = "";
  }

  // verify email function that takes in the form values and calls the security service to verify the email
  verifyEmail() {
    this.isLoading = true;

    const email = this.emailForm.controls['email'].value;

    // call the security service to verify the email
    this.securityService.verifyEmail(email).subscribe({
      // if successful, navigate to the reset password page
      next: (res) => {
        console.log(res);
        this.router.navigate(['/session/verify-security-questions'], { queryParams: { email }, skipLocationChange: true })
      },
      // if unsuccessful, display an error message
      error: (err) => {
        console.log("server error from the VerifyEmail call: ", err)

        //if the error is 404, display an error message
        if (err.status === 404) {
          this.errorMessage = "The email address entered was not found. Please try again.";
          return
        }

        // if the error is 500, display an error message
        this.errorMessage = "There was a problem verifying the email address. Please try again later.";
        this.isLoading = false;
      },

      // if the call is successful, display a message
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
