/**
 * Title: app-routing.module.ts
 * Modified by: Caitlynne Johnson, Megan Walker, Ngi Bujri
 * Date: 9/13/23
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './shared/auth.guard';
import { roleGuard } from './shared/role.guard';
import { EmployeeDirectoryComponent } from './employee-directory/employee-directory.component';
import { FaqComponent } from './faq/faq.component';
import { PurchasesByServiceComponent } from './purchases-by-service/purchases-by-service.component';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    canActivateChild: [authGuard], // prevent access to child pages
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'BCRS: Home', // title for the home page
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'BCRS: Home',
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
        title: 'BCRS: 404',
      },
       {
        path: 'employee-directory',
        component: EmployeeDirectoryComponent,
        title: 'BCRS: Employee Directory'
      },
       {
        path: 'faq',
        component: FaqComponent,
        title: 'BCRS: FAQ'
      },
      {
        path: 'invoice-summary',
        component: InvoiceSummaryComponent,
        title: 'BCRS: Invoice Summary',
      },
      {
        path: 'purchases-by-service',
        component: PurchasesByServiceComponent,
        title: 'BCRS: Purchases By Service'
      },
      {
        // path for admin module
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [roleGuard], // prevent access if not admin
      },
    ],
  },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () =>
      import('./security/security.module').then((m) => m.SecurityModule),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
