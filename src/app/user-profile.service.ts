/**
 * title: user-profile.service.ts
 * author: ngi bujri
 * date: september 26 2023
 * description: user profile service
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileViewModel } from './my-profile/profile-view-model';
import { ProfileUpdateModel } from './my-profile/profile-update-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(email: string): Observable<ProfileViewModel> {
    return this.http.get<ProfileViewModel>(
      '/api/users/' + email + '/my-profile'
    );
  }

  editProfile(email: string, user: ProfileUpdateModel) {
    return this.http.put('/api/users/' + email + '/edit-profile', { user });
  }
}
