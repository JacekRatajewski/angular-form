import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SignInResult } from '../../app/sign-in/services/models/sign-in-result.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const _token = localStorage.getItem('token');
    const token = _token ? (JSON.parse(_token) as SignInResult) : undefined;
    const isLoggedIn = !!token?.token;

    if (state.url === '/' && isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }

    if (state.url === '/home' && !isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
