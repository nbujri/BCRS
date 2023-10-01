/* Title: invoice.service
Author: Megan Walker
Date: 09-26-2023
Description: Invoice Service
Source: Professor Krasso, Angular.io */

// imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceModel } from './invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) { }

  createInvoice(username: string, invoice: InvoiceModel) {
    // Include the username in the URL if needed
    const url = `/api/invoices/${username}`;
    return this.http.post(url, { invoice });
  }

  getInvoices() {
    return this.http.get('/api/invoices/');
  }

  // for our services graph
  findPurchasesByServiceGraph() {
    return this.http.get('/api/invoices/purchases-graph');
  }

  getInvoice(invoiceNumber: string) {
    const url = `/api/invoices/${invoiceNumber}`;
    return this.http.get(url);
  }
}
