import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AboutService} from 'app/_common/services';

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
                NoopAnimationsModule,
                RouterTestingModule
            ],
            declarations: [
                AboutComponent
            ],
            providers: [
                AboutService
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
        spyOn(aboutService, 'getApiVersion').and.returnValue(Observable.of(null));

        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should get static version info', () => {
        const staticVersion = [{'test': 'test', 'testtest': 'testest'}];
        const getStaticVersion = jasmine.createSpy('getStaticVersion');

        spyOn(aboutService, 'getApiVersion').and.returnValue(Observable.of(null));
        spyOn(aboutService, 'getStaticVersion').and.callFake(() => {
            getStaticVersion();
            return Observable.of(staticVersion);
        });

        fixture.detectChanges();

        expect(getStaticVersion).toHaveBeenCalled();
    });

    it('should get api version info', () => {
        const apiVersion = {'git': {'commit': {'time': 123, 'id': '123'}, 'branch': 'master'}};
        const getApiVersion = jasmine.createSpy('getApiVersion');

        spyOn(aboutService, 'getStaticVersion').and.returnValue(Observable.of(null));
        spyOn(aboutService, 'getApiVersion').and.callFake(() => {
            getApiVersion();
            return Observable.of(apiVersion);
        });

        fixture.detectChanges();

        expect(getApiVersion).toHaveBeenCalled();
    });
});
