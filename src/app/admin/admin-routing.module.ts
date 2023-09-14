/**
 * title: admin-routing.module.ts
 * author: ngi bujri
 * date: september 14 2023
 * description: routing for admin module
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        // path to user-list component (user config page)
        path: 'users',
        component: UserListComponent,
        title: 'BCRS: Users',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
