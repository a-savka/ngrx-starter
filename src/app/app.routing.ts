import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingComponent
  }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
