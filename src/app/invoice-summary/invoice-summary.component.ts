/* Title: invoice-summary.component
Author: Megan Walker
Date: 09-30-2023
Description: Invoice Summary Component
Source: Professor Krasso, Angular.io */

// imports
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceModel } from '../invoice.model';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css']
})
export class InvoiceSummaryComponent {

  printInvoice(): void {
    window.print();
  }

  // define variables
  id: string
  invoice: InvoiceModel

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private router: Router) {

    // initialize the invoice model
    this.invoice = {} as InvoiceModel
    const l_invoiceNumber = this.route.snapshot.paramMap.get('invoiceNumber') || ''

    this.id = l_invoiceNumber;

    console.log(this.id)

    // call the invoice service and get the invoice by id
    this.invoiceService.getInvoice(this.id).subscribe({
      next: (invoice: any) => {
        this.invoice = invoice
        console.log(this.invoice)
      },
      error: (err) => {
        console.error(err)
      },
      complete: () => {
        console.log('This Works!')
      }
    })
  }
}