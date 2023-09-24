/**
 * title: register.component.ts
 * author: ngi bujri, megan walker, caitlynne johnson
 * date: september 19 2023
 * description: register component
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SecurityService } from '../security.service';
import { RegisterViewModel } from '../register-view-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // variables
  securityQuestions: string[];
  questionsArray1: string[];
  questionsArray2: string[];
  questionsArray3: string[];
  user: RegisterViewModel;
  errorMessage: string;

  // form group
  registerForm: FormGroup = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
        ),
      ]),
    ],
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required])],
    address: [null, Validators.compose([Validators.required])],
    question1: [null, Validators.compose([Validators.required])],
    answer1: [null, Validators.compose([Validators.required])],
    question2: [null, Validators.compose([Validators.required])],
    answer2: [null, Validators.compose([Validators.required])],
    question3: [null, Validators.compose([Validators.required])],
    answer3: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private securityService: SecurityService
  ) {
    // initialize variables
    this.securityQuestions = [
      'what is your favorite color?',
      'what is your favorite food?',
      'what was the model of your first car?',
      'what highschool did you go to?',
      'what was the name of you pet?',
      'what is the name of your favorite band?',
    ];
    this.questionsArray1 = this.securityQuestions;
    this.questionsArray2 = [];
    this.questionsArray3 = [];
    this.user = {} as RegisterViewModel;
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.registerForm.get('question1')?.valueChanges.subscribe((val) => {
      console.log('question 1 value change: ', val);
      // filter out selected question 1 from questionArray2
      // prevents selecting same question
      this.questionsArray2 = this.questionsArray1.filter((q) => q !== val);
    });

    this.registerForm.get('question2')?.valueChanges.subscribe((val) => {
      console.log('question 2 value change: ', val);
      // filter out selected question 2 from questionArray3
      // prevents selecting same question
      this.questionsArray3 = this.questionsArray2.filter((q) => q !== val);
    });
  }

  register() {
    // assign input values to user properties
    this.user = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      phoneNumber: this.registerForm.get('phoneNumber')?.value,
      address: this.registerForm.get('address')?.value,
      selectedSecurityQuestions: [
        {
          question: this.registerForm.get('question1')?.value,
          answer: this.registerForm.get('answer1')?.value,
        },
        {
          question: this.registerForm.get('question2')?.value,
          answer: this.registerForm.get('answer2')?.value,
        },
        {
          question: this.registerForm.get('question3')?.value,
          answer: this.registerForm.get('answer3')?.value,
        },
      ],
    };

    console.log('new user: ', this.user);

    // call the register method and pass in user
    this.securityService.register(this.user).subscribe({
      next: (result) => {
        console.log('result: ', result);
        this.router.navigate(['/security/signin']);
      },
      error: (err) => {
        if (err.error.message) {
          console.log('db error: ', err.error.message);
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage =
            'something went wrong. please contact the system administrator';
          console.log(err);
        }
      },
    });
  }
}
