/* Title: security-routing.module
Author: Megan Walker, Ngi Bujri, Caitlynne Johnson
Date: 09-14-2023
Description: security routing module for BCRS
Source: Professor Krasso, Angular.io */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    title: 'BCRS: Security',
    // child routes
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        title: 'BCRS: Sign In',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
