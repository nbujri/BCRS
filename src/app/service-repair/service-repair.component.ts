/* Title: service-repair.component
Author: Megan Walker
Date: 09-26-2023
Description: Service Repair Component
Source: Professor Krasso, Angular.io */

// imports
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { InvoiceModel } from '../invoice.model';
import { LineItemsModel } from '../line-items.model';

// Create a Service interface
interface Service {
  name: string;
  price: number;
  selected: boolean;
}

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})
export class ServiceRepairComponent {

  // Initialize otherServicesSelected as false
  otherServicesSelected: boolean = false;

  // establish form group and define validators
  invoiceForm: FormGroup = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    fullName: ['', Validators.compose([Validators.required])],
    orderDate: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9-]*$')])],
  })

  // create an array of services
  services: Service[] = [
    { name: 'Password Reset', price: 39.99, selected: false },
    { name: 'Spyware Removal', price: 99.99, selected: false },
    { name: 'RAM Upgrade', price: 129.99, selected: false },
    { name: 'Software Installation', price: 49.99, selected: false },
    { name: 'PC Tune-up', price: 89.99, selected: false },
    { name: 'Keyboard Cleaning', price: 45.00, selected: false },
    { name: 'Disk Clean-up', price: 129.99, selected: false },
  ];

  // initialize variables for the form
  parts: number = 0;
  labor: number = 0;
  totalCost: number = 0;
  errorMessage: string;

  constructor(private fb: FormBuilder, private router: Router, private invoiceService: InvoiceService) {
    this.errorMessage = '';
  }

  // Function to calculate the total cost of the invoice
  calculateTotal(): void {
    const servicesCost = this.services
      .filter(service => service.selected)
      .reduce((total, service) => total + service.price, 0);

    const laborPrice = this.labor * 50;
    const partsPrice = this.parts;
    this.totalCost = servicesCost + laborPrice + partsPrice;
  }

  // Function to create the invoice
  createInvoice() {
    // setup the lineItems variable to an empty array
    const lineItems: LineItemsModel[] = this.services
      .filter(service => service.selected)
      .map(service => ({
        id: 0, // Assign a unique ID as needed
        checked: false, // Initialize as needed
        name: service.name,
        price: service.price
      }));

    // calculate the total line items cost
    const servicesCost = this.services
      .filter(service => service.selected)
      .reduce((total, service) => total + service.price, 0);

    // calculate labor total
    const laborPrice = this.labor * 50;
    // calculate parts total
    const partsPrice = this.parts;
    // calculate overall total cost
    this.totalCost = servicesCost + laborPrice + partsPrice;

    // generate random invoiceNumber
    const rando = Math.floor(1000000 * Math.random());
    const randomNumber = rando.toString();

    const invoice: InvoiceModel = {
      invoiceNumber: randomNumber,
      email: this.invoiceForm.controls['email'].value, // pulls the email from the form on the page
      fullName: this.invoiceForm.controls['fullName'].value, // pulls the full name from the form on the page
      partsAmount: partsPrice,
      laborAmount: laborPrice,
      lineItemTotal: servicesCost,
      invoiceTotal: this.totalCost,
      orderDate: this.invoiceForm.controls['orderDate'].value,
      lineItems: lineItems
    };

    // calls the invoice Service to create an invoice
    this.invoiceService.createInvoice('username', invoice).subscribe({
      next: (res) => {
        console.log(res); // for troubleshooting
        this.router.navigate(['/invoice-list']);
      },
      // error handling
      error: (err) => {
        if (err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Error, Please Contact Administrator.'
        }
      }
    })
  }
}
