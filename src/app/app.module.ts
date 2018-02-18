import './common/util/rxjs.debug';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MaterialModule
} from './material.module';

import { AppComponent } from './app.component';

import * as components from './components';
import { routing } from './app.routing';
import { rootReducer } from './store/rootReducer';

const getPropsArray = obj => Object.values(obj);

@NgModule({
  declarations: [
    AppComponent,
    ...getPropsArray(components) as any[]
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    StoreModule.forRoot(rootReducer),
    routing
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
