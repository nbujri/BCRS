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
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifySecurityQuestionsComponent } from './verify-security-questions/verify-security-questions.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    title: 'BCRS: Security',
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        title: 'BCRS: Sign In'
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'BCRS: Register New User'
      },
      {
        path: 'forgot-password',
        component: VerifyEmailComponent,
        title: 'BCRS: Verify Email'
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsComponent,
        title: 'BCRS: Verify Security Questions'
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: 'BCRS: Reset Password'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule { }
