import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AboutService {
  constructor(private http: HttpClient) {
  }

  getStaticVersion(): Observable<any> {
    return this.http.get('/assets/git.json');
  }

  getApiVersion(): Observable<any> {
    return this.http.get('/api/v1/info');
  }
}
