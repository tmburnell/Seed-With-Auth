import {TestBed, inject, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {AboutService} from 'app/_common/services';

const data = [
  {
    'git': {},
    'build': {}
  }
];

describe('AboutService', () => {
  let aboutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        AboutService
      ]
    });
  });

  beforeEach(inject([AboutService], (..._) => {
    [aboutService] = _;
  }));

  describe('.get', () => {
    it('static version info', async(inject([HttpTestingController],
      (backend: HttpTestingController) => {
        aboutService.getStaticVersion().subscribe(res => {
          expect(res).toEqual(data);
        });

        const resp = backend.match({
          url: '/assets/git.json',
          method: 'GET'
        });

        backend.verify();
        resp[0].flush(data, {status: 200, statusText: 'Ok'});
      })
    ));

    it('api version info', async(inject([HttpTestingController],
      (backend: HttpTestingController) => {
        aboutService.getApiVersion().subscribe(res => {
          expect(res).toEqual(data);
        });

        const resp = backend.match({
          url: '/api/v1/info',
          method: 'GET'
        });

        backend.verify();
        resp[0].flush(data, {status: 200, statusText: 'Ok'});
      })
    ));
  });
});
