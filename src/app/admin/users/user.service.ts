/**
 * title: user.service.ts
 * author: ngi bujri
 * date: september 14 2023
 */

// imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { UserViewModel } from './user-view-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  findAllUsers() {
    return this.http.get('/api/users');
  }

  createUser(user: User) {
    return this.http.post('/api/users/', user);
  }

  updateUser(userId: string, user: UserViewModel) {
    return this.http.put('/api/users/' + userId, { user });
  }
}
