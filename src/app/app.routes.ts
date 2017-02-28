import { ViewPageComponent } from './+view/view-page/view-page.component';
import { Routes } from '@angular/router';
import { ConnectFormComponent } from './+connect';

export const AppRoutes: Routes = [
  { path: 'connect', component: ConnectFormComponent },
  { path: 'view', component: ViewPageComponent },
  {
    path: '',
    redirectTo: '/connect',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/' }
];
