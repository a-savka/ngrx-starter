/// <reference path="./declarations.d.ts" />import 'core-js/es7/reflect';

import 'zone.js'; // angular requires Zone.js prolyfill
import 'reflect-metadata'; // reflect-metadata shim is required when using class decorators

// import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

if (IS_PRODUCTION) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
