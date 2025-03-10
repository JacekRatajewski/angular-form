import { NgModule } from '@angular/core';
import { SignInComponent } from './components/sign-in-page/sign-in-page.component';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './sign-in.routes';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from '../../shared/components/error/error.component';
import { SignInService } from './services/sign-in.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { SignInResult } from './services/models/sign-in-result.model';
import { LocalstorageService } from '../../shared/services/localstorage.service';

const materialModules = [
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
];
const components = [SignInComponent];
const standaloneComponents = [ErrorComponent];
const services = [SignInService, LocalstorageService<SignInResult>];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ...materialModules,
    ...standaloneComponents,
  ],
  exports: [],
  declarations: [...components],
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    ...services,
  ],
})
export class SignInModule {}
