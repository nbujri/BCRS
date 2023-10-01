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
        this.profileForm.controls['email'].setValue(this.userProfile.email);
        this.profileForm.controls['firstName'].setValue(this.userProfile.email);
        this.profileForm.controls['lastName'].setValue(this.userProfile.email);
        this.profileForm.controls['phone'].setValue(this.userProfile.email);
        this.profileForm.controls['address'].setValue(this.userProfile.email);
        this.profileForm.controls['Role'].setValue(this.userProfile.email);
      },
    });
  }
}
