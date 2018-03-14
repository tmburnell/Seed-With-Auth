import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {CodemirrorModule} from 'ng2-codemirror';

import {MaterialModule} from 'app/common/external/material';
import {AboutService} from 'app/_services';
import {TestingServiceProviders} from 'app/_services/TestingService.providers.spec';

import {DstNotificationService} from 'app/common';

import {AboutComponent} from './about.component';
import {Observable} from 'rxjs/Observable';

describe('AboutComponent', () => {
    let component: AboutComponent,
        fixture: ComponentFixture<AboutComponent>,
        aboutService: AboutService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpClientModule,
                MaterialModule,
                NoopAnimationsModule,
                CodemirrorModule,
                RouterTestingModule
            ],
            declarations: [
                AboutComponent
            ],
            providers: [
                AboutService,
                DstNotificationService,
                TestingServiceProviders
            ]
        }).compileComponents();
    }));

    beforeEach(inject([AboutService], (..._) => {
        [aboutService] = _;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutComponent);
        component = fixture.componentInstance;
    });

    it('should successfully create', () => {
        spyOn(aboutService, 'getStaticVersion').and.returnValue(Observable.of(null));
        spyOn(aboutService, 'getEdgeVersion').and.returnValue(Observable.of(null));
        spyOn(aboutService, 'getApiVersion').and.returnValue(Observable.of(null));

        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should get static version info', () => {
        const staticVersion = [{'test': 'test', 'testtest': 'testest'}];
        const getStaticVersion = jasmine.createSpy('getStaticVersion');

        spyOn(aboutService, 'getEdgeVersion').and.returnValue(Observable.of(null));
        spyOn(aboutService, 'getApiVersion').and.returnValue(Observable.of(null));
        spyOn(aboutService, 'getStaticVersion').and.callFake(() => {
            getStaticVersion();
            return Observable.of(staticVersion);
        });

        fixture.detectChanges();

        expect(getStaticVersion).toHaveBeenCalled();
    });

    it('should get edge version info', () => {
        const edgeVersion = {'git': {'commit': {'time': 123, 'id': '123'}, 'branch': 'master'}};
        const getEdgeVersion = jasmine.createSpy('getEdgeVersion');

        spyOn(aboutService, 'getStaticVersion').and.returnValue(Observable.of(null));
        spyOn(aboutService, 'getApiVersion').and.returnValue(Observable.of(null));
        spyOn(aboutService, 'getEdgeVersion').and.callFake(() => {
            getEdgeVersion();
            return Observable.of(edgeVersion);
        });

        fixture.detectChanges();

        expect(getEdgeVersion).toHaveBeenCalled();
    });

    it('should get api version info', () => {
        const apiVersion = {'git': {'commit': {'time': 123, 'id': '123'}, 'branch': 'master'}};
        const getApiVersion = jasmine.createSpy('getApiVersion');

        spyOn(aboutService, 'getStaticVersion').and.returnValue(Observable.of(null));
        spyOn(aboutService, 'getEdgeVersion').and.returnValue(Observable.of(null));
        spyOn(aboutService, 'getApiVersion').and.callFake(() => {
            getApiVersion();
            return Observable.of(apiVersion);
        });

        fixture.detectChanges();

        expect(getApiVersion).toHaveBeenCalled();
    });
});
