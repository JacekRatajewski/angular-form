import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home-page/home-page.component';
import { routes } from './home.routes';
import { provideRouter } from '@angular/router';
import { UserService } from './services/user.service';
import { LocalstorageService } from '../../shared/services/localstorage.service';
import { SignInResult } from './services/models/sign-in-result.model';
import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

const materialModules = [MatMenuModule, MatIconModule, MatSidenavModule];
const services = [UserService, LocalstorageService<SignInResult>];

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [],
  declarations: [HomeComponent],
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    ...services,
  ],
})
export class HomeModule {}
