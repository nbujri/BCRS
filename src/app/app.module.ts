import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { NavComponent } from './layouts/nav/nav.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChartModule } from 'primeng/chart';
import { FaqComponent } from './faq/faq.component';
import { ServiceRepairComponent } from './service-repair/service-repair.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';
import { PurchasesByServiceComponent } from './purchases-by-service/purchases-by-service.component';
import { ServiceGraphComponent } from './service-graph/service-graph.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    NavComponent,
    FooterComponent,
    NotFoundComponent,
    FaqComponent,
    ServiceRepairComponent,
    InvoiceListComponent,
    InvoiceSummaryComponent,
    InvoiceSummaryComponent,
    PurchasesByServiceComponent,
    ServiceGraphComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, MatExpansionModule, MatButtonModule, ChartModule, FormsModule, ReactiveFormsModule, MatCardModule],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {
}
