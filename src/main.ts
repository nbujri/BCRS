/* Title: main
Author: Megan Walker, Ngi Bujri, Caitlynne Johnson
Date: 09-14-2023
Description: main component for BCRS
Source: Professor Krasso, Angular.io */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
