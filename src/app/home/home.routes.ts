import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
];
