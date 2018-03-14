import {HttpClient} from '@angular/common/http';
import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {User, Login} from 'app/_common/models';

@Injectable()
export class AuthenticationService {
  private user: User;

  public loginSuccess: EventEmitter<any> = new EventEmitter();
  public timeout: EventEmitter<any> = new EventEmitter();

  supportedURLS = [
    '/authenticate',
    '/userInfo'
  ];

  constructor(private http: HttpClient) {
  }

  isAuthCall(url: string): Boolean {
    return this.supportedURLS.indexOf(url) > -1;
  }

  login(body: Login): Observable<any> {
    return this.http.post('/authenticate', body).map(res => {
      this.emitValidUser();
      return res;
    });
  }

  createUser(body: any): Observable<any> {
    return this.http.post('/userInfo', body);
  }

  emitValidUser() {
    this.loginSuccess.emit();
  }

  emitTimeOut() {
    this.timeout.emit();
  }

  logout(): void {
    this.clearUser();
    window.location.href = `${window.location.origin}/logout`;
  }

  clearUser(): void {
    this.user = undefined;
  }

  getUser(): Observable<User> {
    if (this.user) {
      return Observable.of(this.user);
    }

    return this.http.get('/userInfo').map(res => {
      this.user = res as User;
      return this.user;
    });
  }

  getCurrentUser(): User {
    return this.user;
  }

  getCurrentUserId(): string | undefined {
    return this.user ? this.user.username : undefined;
  }
}
