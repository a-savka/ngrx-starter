
import { NgModule } from '@angular/core';

import {
  MatTabsModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';

const modules = [
  MatTabsModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatToolbarModule
];

@NgModule ({
  imports: modules,
  exports: modules
})
export class MaterialModule {
}
