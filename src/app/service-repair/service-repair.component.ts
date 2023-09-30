/* Title: service-repair.component
Author: Megan Walker
Date: 09-26-2023
Description: Service Repair Component
Source: Professor Krasso, Angular.io */

// Import statements
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { InvoiceModel } from '../invoice.model';

// Export component
interface Service {
  name: string;
  price: number;
  selected: boolean;
}


// Component details
@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})

// Export class
export class ServiceRepairComponent {

  // Form group for invoice
  invoiceForm: FormGroup = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    fullName: ['', Validators.compose([Validators.required])],
  })

  // Services array for invoice
  services: Service[] = [
    { name: 'Password Reset', price: 39.99, selected: false },
    { name: 'Spyware Removal', price: 99.99, selected: false },
    { name: 'RAM Upgrade', price: 129.99, selected: false },
    { name: 'Software Installation', price: 49.99, selected: false },
    { name: 'PC Tune-up', price: 89.99, selected: false },
    { name: 'Keyboard Cleaning', price: 45.00, selected: false },
    { name: 'Disk Clean-up', price: 129.99, selected: false }
  ];

  // Variables for invoice
  parts: number = 0;
  labor: number = 0;
  totalCost: number = 0;
  errorMessage: string;

  // Constructor for invoice
  constructor(private fb: FormBuilder, private router: Router, private invoiceService: InvoiceService) {
    this.errorMessage = '';
  }

  // Calculate total for invoice
  calculateTotal(): void {
    const servicesCost = this.services
      .filter(service => service.selected)
      .reduce((total, service) => total + service.price, 0);

    // Calculate total for invoice
    const laborPrice = this.labor * 50;
    const partsPrice = this.parts;
    this.totalCost = servicesCost + laborPrice + partsPrice;
  }

  // Create invoice
  createInvoice() {
    const servicesCost = this.services
      .filter(service => service.selected)
      .reduce((total, service) => total + service.price, 0);

    // Calculate total for invoice
    const laborPrice = this.labor * 50;
    const partsPrice = this.parts;
    this.totalCost = servicesCost + laborPrice + partsPrice;

    // Create invoice model
    const invoice: InvoiceModel = {
      email: this.invoiceForm.controls['email'].value,
      fullName: this.invoiceForm.controls['fullName'].value,
      partsAmount: partsPrice,
      laborAmount: laborPrice,
      lineItemTotal: servicesCost,
      invoiceTotal: this.totalCost,
      orderDate: "10/10/2020",
      lineItems: [
        {
          id: 100,
          name: "Parts",
          price: 100,
          checked: false
        }
      ]
    };

    // Create invoice service
    this.invoiceService.createTheInvoice(invoice).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/service-repair']);
      },
      // Error message
      error: (err) => {
        if (err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Unable to create invoice. Please contact the Administator.'
        }
      }
    })
  }
}