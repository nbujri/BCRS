/* Title: admin.module
Author: Megan Walker,  Ngi Bujri, Caitlynne Johnson
Date: 09-14-2023
Description: admin module for BCRS
Source: Professor Krasso, Angular.io */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './users/user-list/user-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
