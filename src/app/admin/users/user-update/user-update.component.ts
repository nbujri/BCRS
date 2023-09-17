/**
 * title: user-update.components.ts
 * author: ngi bujri
 * date: september 16 2023
 * description: user update component
 */

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { UserViewModel } from '../user-view-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent {
  // variables
  email: string;
  user: User;

  // user update form group
  userUpdateForm: FormGroup = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    address: [null],
    phoneNumber: [null],
    role: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = {} as User; // initialize user
    // get employee email
    this.email = this.route.snapshot.paramMap.get('email') || '';
    console.log(this.email);

    this.userService.findByEmail(this.email).subscribe({
      next: (user: any) => {
        this.user = user;
        console.log('user:', user);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // set form to current matching values
        this.userUpdateForm.controls['email'].setValue(this.user.email);
        this.userUpdateForm.controls['firstName'].setValue(this.user.firstName);
        this.userUpdateForm.controls['lastName'].setValue(this.user.lastName);
        this.userUpdateForm.controls['address'].setValue(this.user.address);
        this.userUpdateForm.controls['phoneNumber'].setValue(
          this.user.phoneNumber
        );
        this.userUpdateForm.controls['role'].setValue(this.user.role);
      },
    });
  }

  updateUser() {
    let user = {} as UserViewModel;

    user.email = this.userUpdateForm.controls['email'].value;
    user.firstName = this.userUpdateForm.controls['firstName'].value;
    user.lastName = this.userUpdateForm.controls['lastName'].value;
    // return empty string if not provided to prevent returning null
    user.address = this.userUpdateForm.controls['address'].value || '';
    // return empty string if not provided to prevent returning null
    user.phoneNumber = this.userUpdateForm.controls['phoneNumber'].value || '';
    user.role = this.userUpdateForm.controls['role'].value;

    console.log('updated user info: ', user);

    this.userService.updateUser(this.email, user).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/admin/users']); // redirect to user list
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
