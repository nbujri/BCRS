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
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ServiceRepairComponent } from './service-repair/service-repair.component';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ServiceGraphComponent } from './service-graph/service-graph.component';

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
        title: 'BCRS: Employee Directory',
      },
      {
        path: 'faq',
        component: FaqComponent,
        title: 'BCRS: FAQ',
      },
      {
        path: ':email/my-profile',
        component: MyProfileComponent,
        title: 'BCRS: My Profile',
      },
      {
        path: 'service-graph',
        component: ServiceGraphComponent,
        title: 'BCRS: Purchases By Service',
      },
      {
        path: 'service-repair',
        component: ServiceRepairComponent,
        title: 'BCRS: Service Repair',
      },
      {
        path: 'invoice-summary/:invoiceNumber',
        component: InvoiceSummaryComponent,
        title: 'BCRS: Invoice Summary',
      },
      {
        path: 'invoice-list',
        component: InvoiceListComponent,
        title: 'BCRS: Invoice List',
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
