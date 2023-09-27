/* Title: invoice.service
Author: Megan Walker
Date: 09-26-2023
Description: Invoice Service
Source: Professor Krasso, Angular.io */

// imports for invoice service
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceModel } from './invoice.model';

// export the invoice service
@Injectable({
  providedIn: 'root'
})
// export the invoice service
export class InvoiceService {

  // constructor for invoice service
  constructor(private http: HttpClient) { }

  // find all invoices
  createTheInvoice(invoice: InvoiceModel) {
    return this.http.post('/api/invoices/', { invoice })
  }
}