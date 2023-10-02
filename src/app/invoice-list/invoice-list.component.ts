/* Title: invoice-list.component
Author: Megan Walker
Date: 09-30-2023
Description: Invoice List Component
Source: Professor Krasso, Angular.io */

// imports
import { Component, OnInit } from '@angular/core';
import { InvoiceModel } from '../invoice.model';
import { InvoiceService } from '../invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit { // Implement OnInit interface

  invoices: InvoiceModel[] = []; // Initialize the invoices array
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private invoiceService: InvoiceService, private router: Router) { }

  // Fetch invoices on component initialization
  ngOnInit(): void {
    this.fetchInvoices();
  }

  // Fetch invoices and handle errors
  fetchInvoices(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (invoices: any) => {
        this.invoices = invoices;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch invoices. Please try again.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Clear success and error messages after a delay
  hideAlert(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
