/**
 * title: register.component.ts
 * author: ngi bujri, megan walker, caitlynne johnson
 * date: september 19 2023
 * description: register component
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SecurityService } from '../security.service';
import { UserRegister } from '../user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // array of selectable security questions
  securityQuestions = [
    'what is your favorite food?',
    'what is your favorite color?',
    'what high school did you go to?',
    'what model was your first car?',
    'what country were you born in?',
    "what was your pet's name?",
  ];
}
