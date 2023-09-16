/* Title: user-list.component
Author: Megan Walker, Ngi Bujri, Caitlynne Johnson
Date: 09-14-2023
Description: user-list component for BCRS
Source: Professor Krasso, Angular.io */

import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: User[]; // store users here
  successMessage: string; // store success messages here
  errorMessage: string; // store error messages gere
  isLoading: boolean; // for loading spinner

  // add user form group
  addUserForm: FormGroup = this.fb.group({
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
    address: [null],
    phoneNumber: [null],
    role: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // initialize variables
    this.users = [];
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    // populate table
    this.updateTable();
  }

  // delete a user
  deleteUser(id: string) {
    if (
      !confirm('Are you sure you want to disable the following user?\n' + id)
    ) {
      return;
    }

    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        this.users = this.users.filter((user) => user.email !== id);
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.error(err);
        this.hideAlert();
      },
    });
  }

  createUser() {
    const user: User = {
      email: this.addUserForm.controls['email'].value,
      firstName: this.addUserForm.controls['firstName'].value,
      lastName: this.addUserForm.controls['lastName'].value,
      password: this.addUserForm.controls['password'].value,
      // return empty string if not provided to prevent returning null
      phoneNumber: this.addUserForm.controls['phoneNumber'].value || '',
      // return empty string if not provided to prevent returning null
      address: this.addUserForm.controls['address'].value || '',
      isDisabled: false,
      role: this.addUserForm.controls['role'].value,
    };

    console.log(user);

    this.userService.createUser(user).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage = 'user successfully created';
        this.hideAlert();
        // refresh table with newly created user
        this.updateTable();
      },
      error: (err) => {
        if (err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage =
            'unable to create user, please contact system admin';
        }
        this.hideAlert();
      },
    });
  }

  // hides messages after 3 seconds
  hideAlert() {
    setTimeout(() => {
      this.successMessage = ''; // reset successMessage
      this.errorMessage = ''; //reset errorMessage
    }, 3000);
  }

  // updates table data
  updateTable() {
    // return all existing users
    this.userService.findAllUsers().subscribe({
      next: (users: any) => {
        this.users = users;
        console.log('users: ', this.users);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
