import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {SpyLocation} from '@angular/common/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatDialog, MatDialogModule, OverlayContainer} from '@angular/material';
import {ViewContainerRef, Directive, Component, ViewChild} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ExpiredSessionModalComponent} from './expired-session-modal.component';

@Component({
  template: ''
})

class DummyComponent {
}

// This is a placeholder container for the dialog
@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'app-dir-with-view-container'
})
class DirectiveWithViewContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-arbitrary-component',
  template: `<app-dir-with-view-container></app-dir-with-view-container>`,
})
class ComponentWithChildViewContainerComponent {
  @ViewChild(DirectiveWithViewContainerDirective) childWithViewContainer: DirectiveWithViewContainerDirective;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

describe('ExpiredSessionModalComponent', () => {
  let dialog: MatDialog;
  let dialogRef;
  let overlayContainerElement: HTMLElement;
  let component: ExpiredSessionModalComponent;

  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainerComponent>;

  let router, location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {path: 'expiredSession ', component: DummyComponent},
        ])
      ],
      declarations: [
        DirectiveWithViewContainerDirective,
        ComponentWithChildViewContainerComponent,
        ExpiredSessionModalComponent,
        DummyComponent
      ],
      providers: [
        {provide: Location, useClass: SpyLocation},
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return {getContainerElement: () => overlayContainerElement};
          }
        }
      ]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ComponentWithChildViewContainerComponent, ExpiredSessionModalComponent]
      }
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MatDialog, Router, Location], (..._) => {
    [dialog, router, location] = _;
  }));

  it('should create', () => {
    viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainerComponent);
    viewContainerFixture.detectChanges();
    testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;

    dialogRef = dialog.open(ExpiredSessionModalComponent, {
      width: '600px',
      disableClose: true,
      viewContainerRef: testViewContainerRef
    });
    component = dialogRef.componentInstance;

    viewContainerFixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
