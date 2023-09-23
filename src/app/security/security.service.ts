/* Title: security.service
Author: Megan Walker
Date: 09-13-2023
Description: Security service for BCRS
Source: Professor Krasso, Angular.io */

// imports for security service
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterViewModel } from './register-view-model';
import { selectedSecurityQuestionsViewModel } from './selected-security-questions-view-model';
import { Observable } from 'rxjs';

// security service injectable
@Injectable({
  providedIn: 'root',
})

// export class
export class SecurityService {
  constructor(private http: HttpClient) {}

  // signup function for security service
  signin(email: string, password: string) {
    return this.http.post('/api/security/signin', {
      email,
      password,
    });
  }

  register(user: RegisterViewModel) {
    return this.http.post('api/security/register', { user });
  }

  verifyEmail(email: string) {
    return this.http.post('/api/security/verify/users/' + email, {});
  }

  verifySecurityQuestions(
    email: string,
    securityQuestions: selectedSecurityQuestionsViewModel[]
  ): Observable<any> {
    return this.http.post(
      '/api/security/verify/users/' + email + '/security-questions',
      { securityQuestions }
    );
  }
}
