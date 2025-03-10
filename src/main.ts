import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { isDevMode } from '@angular/core';
import { worker } from './mock/init';
const init = () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
};
if (isDevMode()) {
  worker('http://localhost:5000').start().then(init);
}
