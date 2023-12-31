/* Title: security.service
Author: Megan Walker
Date: 09-13-2023
Description: Security service for BCRS
Source: Professor Krasso, Angular.io */

// imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterViewModel } from './register-view-model';
import { selectedSecurityQuestionsViewModel } from './selected-security-questions-view-model';
import { Observable } from 'rxjs';

// security service
@Injectable({
  providedIn: 'root',
})

// export class
export class SecurityService {
  constructor(private http: HttpClient) {}

  // signin function
  signin(email: string, password: string) {
    return this.http.post('/api/security/signin', {
      email,
      password,
    });
  }

  // register function
  register(user: RegisterViewModel) {
    return this.http.post('/api/security/register', { user });
  }

  // find user by email function
  verifyEmail(email: string) {
    return this.http.post('/api/security/verify/users/' + email, {});
  }

  // find selected security questions function
  findSelectedSecurityQuestions(email: string) {
    return this.http.get('/api/users/' + email + '/security-questions');
  }

  // verify security questions function
  verifySecurityQuestions(
    email: string,
    securityQuestions: selectedSecurityQuestionsViewModel[]
  ): Observable<any> {
    return this.http.post(
      '/api/security/verify/users/' + email + '/security-questions',
      { securityQuestions }
    );
  }

  // reset password function
  changePassword(email: string, password: string): Observable<any> {
    return this.http.post('/api/security/users/' + email + '/reset-password', {
      password,
    });
  }
}
