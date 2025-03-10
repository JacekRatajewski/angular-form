import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home-page/home-page.component';
import { routes } from './home.routes';
import { provideRouter } from '@angular/router';


@NgModule({
    imports: [],
    exports: [],
    declarations: [HomeComponent],
    providers: [provideRouter(routes)],
})
export class HomeModule { }
