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
  providedIn: 'root'
})

// export class
export class SecurityService {

  constructor(private http: HttpClient) { }

  // signup function for security service
  signin(email: string, password: string) {
    return this.http.post('/api/security/signin', {
      email,
      password
    })
  }

  // register function for security service
  register(user:RegisterViewModel) {
    return this.http.post('/api/security/register', {user })
  }

  // verify email function for security service
  verifyEmail(email: string) {
    return this.http.post('/api/security/verify/users/' + email, {})
  }

  // returns the findSelectedSecurityQuestions function
  findSelectedSecurityQuestions(email: string) {
    return this.http.get('/api/user' + email + '/security-questions')
  }

  // returns the verifySecurityQuestions function
  verifySecurityQuestions(email: string, securityQuestions: selectedSecurityQuestionsViewModel[]): Observable<any> {
    return this.http.post('/api/security/verify/user/' + email + 'security-questions', {securityQuestions})
  }

  // returns the resetPassword function
  resetPassword(email: string, password: string): Observable<any> {
    return this.http.post('/api/security/users/' + email + '/reset-password', {password})
  }
}