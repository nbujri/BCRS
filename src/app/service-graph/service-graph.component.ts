import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-service-graph',
  templateUrl: './service-graph.component.html',
  styleUrls: ['./service-graph.component.css']
})
export class ServiceGraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const myService = new Chart("myServiceChart", {
      type: 'pie',
      data: {
          labels: ['Password Reset', 'Spyware Removal', 'RAM Upgrade', 'Software Installation', 'PC Tune-up', 'Keyboard Cleaning', 'Disk Clean-up'], // Labels for the data
          datasets: [{
              data: [12, 19, 3, 5, 2, 3, 30], // Data for the dataset
              backgroundColor: [
                '#ED0A3F',
                '#FF8833',
                '#5FA777',
                '#0066CC',
                '#6B3FA0',
                '#AF593E',
                '#6CDAE7'
              ],
              hoverBackgroundColor: [
                '#ED0A3F',
                '#FF8833',
                '#5FA777',
                '#0066CC',
                '#6B3FA0',
                '#AF593E',
                '#6CDAE7'
              ],
          }]
      }
    })
  }
}
  


