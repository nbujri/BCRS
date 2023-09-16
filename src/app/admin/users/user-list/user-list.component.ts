/* Title: user-list.component
Author: Megan Walker, Ngi Bujri, Caitlynne Johnson
Date: 09-14-2023
Description: user-list component for BCRS
Source: Professor Krasso, Angular.io */

import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Colors } from 'chart.js';

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

  constructor(private userService: UserService) {
    // initialize variables
    this.users = [];
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    // return all users
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

  // delete a user
  deleteUser(id: string) {
    if (
      !confirm('Are you sure you want to disable the following user?\n' + id)
    ) {
      return;
    }

    this.userService.deleteUser(id).subscribe({
      next: (res) => {},
      error: (err) => {
        this.errorMessage = err.message;
        console.error(err);
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
}
