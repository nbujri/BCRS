/* Title: app.component
Author: Megan Walker, Ngi Bujri, Caitlynne Johnson
Date: 09-14-2023
Description: app component for BCRS
Source: Professor Krasso, Angular.io
 */
// imports statements
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- This router-outlet displays the content of the BaseLayout or AuthLayout components -->
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
}
