import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in-page/sign-in-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: SignInComponent },
];
