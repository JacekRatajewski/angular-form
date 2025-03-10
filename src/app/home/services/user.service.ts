import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private URL = 'assets/user_data.json';
  constructor(private httpClient: HttpClient) {}

  getUser$(token: string): Observable<User> {
    return this.httpClient.get<User>(this.URL);
  }
}
