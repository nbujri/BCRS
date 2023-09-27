/* Title: invoice.model
Author: Megan Walker
Date: 09-26-2023
Description: Invoice Model
Source: Professor Krasso, Angular.io */

// imports
import { LineItemsModel } from "./line-items.model"

// export the model
export interface InvoiceModel {
  email: string
  fullName: string
  partsAmount: number
  laborAmount: number
  lineItemTotal: number
  invoiceTotal: number
  orderDate: string
  lineItems: LineItemsModel[]
}