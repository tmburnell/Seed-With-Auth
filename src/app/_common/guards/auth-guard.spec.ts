import {TestBed, async, inject} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {AuthenticationService} from 'app/_common/services';

import {AuthGuard} from './auth-guard';

describe('AuthGuard', () => {
  let authGuard, router, authenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        AuthGuard,
        AuthenticationService
      ],
    });
  });

  beforeEach(inject([AuthGuard, Router, AuthenticationService], (..._) => {
    [authGuard, router, authenticationService] = _;
  }));

  it('should allow access when user exists', async(() => {
    const getUser = jasmine.createSpy('getUser');
    spyOn(authenticationService, 'getUser').and.callFake(() => {
      getUser();
      return Observable.of({name: 'test'});
    });

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBe(true);
      expect(getUser).toHaveBeenCalled();
    });
  }));

  it('should redirect to login when user is not authenticated', async(() => {
    const getUser = jasmine.createSpy('getUser'),
      routeNavigate = jasmine.createSpy('routeNavigate');

    spyOn(authenticationService, 'getUser').and.callFake(() => {
      getUser();
      return Observable.throw('failed to fetch user');
    });
    spyOn(router, 'navigate').and.callFake((navLocation) => {
      expect(navLocation).toEqual(['/login']);
      routeNavigate();
    });


    authGuard.canActivate().subscribe((result) => {
      expect(result).toBe(false);
      expect(getUser).toHaveBeenCalled();
      expect(routeNavigate).toHaveBeenCalled();
    });
  }));

  it('CanActivateChild route should execute the same logic as CanActivate', () => {
    const canActivate = jasmine.createSpy('canActivate');
    spyOn(authGuard, 'canActivate').and.callFake(canActivate);

    authGuard.canActivateChild();

    expect(canActivate).toHaveBeenCalled();
  });
});
