/* Title: security.module
Author: Megan Walker, Ngi Bujri, Caitlynne Johnson
Date: 09-14-2023
Description: security module for BCRS
Source: Professor Krasso, Angular.io */

// imports statements
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    SecurityComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
