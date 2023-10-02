import { Component } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { ProfileViewModel } from './profile-view-model';
import { ProfileUpdateModel } from './profile-update-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent {
  userProfile: ProfileViewModel;
  errorMessage: string;
  profileSaveError: string;
  profileSaveSuccess: string;

  profileForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required])],
    address: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private profileService: UserProfileService,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {
    this.userProfile = {} as ProfileViewModel;
    this.errorMessage = '';
    this.profileSaveError = '';
    this.profileSaveSuccess = '';
    const cookie = JSON.parse(this.cookieService.get('session_user'));
    console.log('cookie: ', cookie);

    this.profileService.getUserProfile(cookie.email).subscribe({
      next: (res) => {
        this.userProfile = res;
        console.log('user profile: ', this.userProfile);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.message;
      },
      complete: () => {
        this.profileForm.controls['firstName'].setValue(
          this.userProfile.firstName
        );
        this.profileForm.controls['lastName'].setValue(
          this.userProfile.lastName
        );
        this.profileForm.controls['phoneNumber'].setValue(
          this.userProfile.phoneNumber
        );
        this.profileForm.controls['address'].setValue(this.userProfile.address);
      },
    });
  }

  // save changes made to profile
  save() {
    // store form values
    const user = {
      firstName: this.profileForm.controls['firstName'].value,
      lastName: this.profileForm.controls['lastName'].value,
      phoneNumber: this.profileForm.controls['phoneNumber'].value,
      address: this.profileForm.controls['address'].value,
    };
    console.log(user);

    this.profileService.editProfile(this.userProfile.email, user).subscribe({
      next: (res) => {
        this.userProfile.firstName = user.firstName;
        this.userProfile.lastName = user.lastName;
        this.userProfile.phoneNumber = user.phoneNumber;
        this.userProfile.address = user.address;
        this.profileSaveSuccess = 'Profile Updated';
      },
      error: (err) => {
        console.log(err);
        this.profileSaveError = err.message;
      },
      complete: () => {
        this.profileForm.reset();
        this.profileForm.controls['firstName'].setValue(
          this.userProfile.firstName
        );
        this.profileForm.controls['lastName'].setValue(
          this.userProfile.lastName
        );
        this.profileForm.controls['phoneNumber'].setValue(
          this.userProfile.phoneNumber
        );
        this.profileForm.controls['address'].setValue(this.userProfile.address);
      },
    });
  }

  // reset to original values
  close() {
    this.profileForm.reset();
    this.profileForm.controls['firstName'].setValue(this.userProfile.firstName);
    this.profileForm.controls['lastName'].setValue(this.userProfile.lastName);
    this.profileForm.controls['phoneNumber'].setValue(
      this.userProfile.phoneNumber
    );
    this.profileForm.controls['address'].setValue(this.userProfile.address);
    this.profileSaveError = '';
    this.profileSaveSuccess = '';
    console.log(this.profileSaveSuccess);
  }
}
