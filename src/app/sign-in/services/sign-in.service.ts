import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInResult } from './models/sign-in-result.model';

@Injectable({ providedIn: 'root' })
export class SignInService {
  private URL = 'http://localhost:5000';
  constructor(private httpClient: HttpClient) {}

  signIn$(email: string, password: string): Observable<SignInResult> {
    return this.httpClient.post<SignInResult>(`${this.URL}/sign-in`, {
      email,
      password,
    });
  }
}
