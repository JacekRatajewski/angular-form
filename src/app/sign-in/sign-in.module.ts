import { NgModule } from '@angular/core';
import { SignInComponent } from './components/sign-in-page/sign-in-page.component';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './sign-in.routes';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), MatGridListModule],
    exports: [],
    declarations: [SignInComponent],
    providers: [provideRouter(routes)],
})
export class SignInModule { }
