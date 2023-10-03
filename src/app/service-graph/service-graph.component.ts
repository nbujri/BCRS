import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { InvoiceService } from '../invoice.service';


@Component({
  selector: 'app-service-graph',
  templateUrl: './service-graph.component.html',
  styleUrls: ['./service-graph.component.css']
})
export class ServiceGraphComponent implements OnInit { // variables 
 purchases: any;
 itemCount: string[] = [];
 labels: string[] = [];

 constructor(private invoiceService: InvoiceService) {
   this.purchases = [];
 }

 ngOnInit(): void {
   this.invoiceService.findPurchasesByServiceGraph().subscribe({
     next: (res) => {
       this.purchases = res;

       
       this.labels.length = 0;
       this.itemCount.length = 0; // clears previouys data

       
       for (let item of this.purchases) {
         let title = item._id.name;
         let count = item.count; // repopulate the data

         this.labels.push(title);
         this.itemCount.push(count);
       }

    const myService = new Chart("myServiceChart", {
      type: 'pie',
      data: {
        labels: this.labels,
          datasets: [{
              data: this.itemCount,
              backgroundColor: [
                '#740001',
                '#eeba30',
                '#740001',
                '#eeba30',
                '#740001',
                '#eeba30',
                '#740001'
              ],
              hoverBackgroundColor: [
                '#eeba3',
                '#740001',
                '#eeba30',
                '#740001C',
                '#eeba30',
                '#740001',
                '#eeba30'
              ],
          }]
      }
    })
  }
}
  

   )
 }
}
