/* Title: security.service
Author: Megan Walker
Date: 09-13-2023
Description: Security service for BCRS
Source: Professor Krasso, Angular.io */

// imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// SecurityService class
@Injectable({
  providedIn: 'root'
})

// export class
export class SecurityService {

  constructor(private http: HttpClient) {
    findEmployeeById(employeeId: string) {
      return this.http.get('/api/employees/' + employeeId);

   }



}