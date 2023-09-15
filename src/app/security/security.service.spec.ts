/* Title: security.service.spec
Author: Megan Walker
Date: 09-13-2023
Description: Security service for BCRS
Source: Professor Krasso, Angular.io */

// imports

import { TestBed } from '@angular/core/testing';

import { SecurityService } from './security.service';

describe('SecurityService', () => {
  let service: SecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
