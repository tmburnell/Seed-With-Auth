import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {MatDialog} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {SpyLocation} from '@angular/common/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/throw';
import {ExpiredSessionComponent} from './expired-session.component';
import {ExpiredSessionModalComponent} from './modal';
import {AuthenticationService} from 'app/_common/services';

describe('ExpiredSessionComponent', () => {
  let component: ExpiredSessionComponent;
  let fixture: ComponentFixture<ExpiredSessionComponent>;

  let dialog, router, authenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          {path: 'sessionExpired', component: ExpiredSessionComponent}
        ])
      ],
      declarations: [
        ExpiredSessionComponent,
        ExpiredSessionModalComponent
      ],
      providers: [
        AuthenticationService,
        {provide: Location, useClass: SpyLocation},
      ]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          ExpiredSessionModalComponent
        ]
      }
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MatDialog, Router, AuthenticationService], (..._) => {
    [dialog, router, authenticationService] = _;
  }));

  describe('should create', () => {
    it('on expired User', () => {
      const getUserInfo = jasmine.createSpy('getUserInfo'),
          modalOpened = jasmine.createSpy('modalOpened'),
          navCalled = jasmine.createSpy('navCalled');

      spyOn(authenticationService, 'getUserInfo').and.callFake(() => {
        getUserInfo();
        return Observable.throw({status: 401});
      });

      router.navigate(['sessionExpired', {resetUser: true}]);

      spyOn(dialog, 'open').and.callFake((comp, config) => {
        expect(comp).toBe(ExpiredSessionModalComponent);
        expect(config.disableClose).toBe(true);
        modalOpened();
      });

      spyOn(router, 'navigate').and.callFake((navLocation) => {
        expect(navLocation).toEqual(['/sessionExpired', {resetUser: true}]);
        navCalled();
      });

      fixture = TestBed.createComponent(ExpiredSessionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component).toBeTruthy();
      expect(getUserInfo).toHaveBeenCalled();
      expect(modalOpened).toHaveBeenCalled();
      expect(navCalled).toHaveBeenCalledTimes(1);
    });

    it('on valid User', () => {
      const getUserInfo = jasmine.createSpy('getUserInfo'),
          modalOpened = jasmine.createSpy('modalOpened'),
          navCalled = jasmine.createSpy('navCalled');

      spyOn(authenticationService, 'getUserInfo').and.callFake(() => {
        getUserInfo();
        return Observable.of({id: 'gooduser', email: 'gooduser@something.com'});
      });

      router.navigate(['expiredSession', {resetUser: true}]);

      spyOn(dialog, 'open').and.callFake((comp, config) => {
        expect(comp).toBe(ExpiredSessionModalComponent);
        expect(config.disableClose).toBe(true);
        modalOpened();
      });

      spyOn(router, 'navigate').and.callFake((navLocation) => {
        expect(navLocation).toEqual(['/home']);
        navCalled();
      });

      fixture = TestBed.createComponent(ExpiredSessionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component).toBeTruthy();
      expect(getUserInfo).toHaveBeenCalled();
      expect(modalOpened).not.toHaveBeenCalled();
      expect(navCalled).toHaveBeenCalled();
    });
  });
});
