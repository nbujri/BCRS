/**
 * title: user-profile.service.ts
 * author: ngi bujri
 * date: september 26 2023
 * description: user profile service
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(email: string) {
    return this.http.get('/api/users/' + email + '/my-profile');
  }
}
