import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { AppComponent } from './app.component';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [],
  declarations: [AppComponent],
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
