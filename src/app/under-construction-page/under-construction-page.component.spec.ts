import {TestBed, async, fakeAsync, ComponentFixture, tick} from '@angular/core/testing';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {UnderConstructionPageComponent} from './under-construction-page.component';

class MockComponent {
}

describe('ConstructionComponent', () => {
  let component: UnderConstructionPageComponent;
  let fixture: ComponentFixture<UnderConstructionPageComponent>;

  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'construction', component: MockComponent}
        ])
      ],
      declarations: [
        UnderConstructionPageComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderConstructionPageComponent);
    component = fixture.componentInstance;

    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should get current route', fakeAsync(() => {
    router.navigate(['construction']);
    tick();
    expect(location.path()).toBe('/construction');
  }));

  describe('.message', () => {
    it('should render message in an h1 tag', async(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Under Construction');
    }));
  });
});
