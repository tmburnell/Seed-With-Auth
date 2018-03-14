import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/catch';

import {AuthenticationService} from 'app/_common/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ignore Auth calls from timeout logic
    if (this.auth.isAuthCall(req.url)) {
      return next.handle(req);
    }

    return next.handle(req).catch((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.auth.emitTimeOut();
        }
      }
      return Observable.throw(err);
    });
  }
}
