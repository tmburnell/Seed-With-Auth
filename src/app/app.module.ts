import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule, MatButtonModule, MatDialogModule, MatInputModule, MatCardModule, MatTooltipModule,
  MatProgressSpinnerModule, MatExpansionModule, MatTabsModule, MatSnackBarModule, MatMenuModule} from '@angular/material';
const MaterialModules = [MatIconModule, MatButtonModule, MatDialogModule, MatInputModule, MatCardModule, MatTooltipModule,
  MatProgressSpinnerModule, MatExpansionModule, MatTabsModule, MatSnackBarModule,MatMenuModule];
import {Angular2FontawesomeModule} from "angular2-fontawesome";

import {AppComponent} from './app.component';
import {AuthGuard} from 'app/_common/guards';
import {ErrorInterceptor} from 'app/_common/interceptors';
import {AuthenticationService, AboutService} from 'app/_common/services';
import {EqualValidator} from 'app/_common/directives';

import {LoginComponent} from './login/login.component';
import {ExpiredSessionComponent, ExpiredSessionModalComponent} from './session-experation';
import {AboutComponent} from './about';
import {UnderConstructionPageComponent} from './under-construction-page';
import {AppRoutingModule} from './app-routing.modul';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModules,
    FlexLayoutModule,
    Angular2FontawesomeModule,

    // App route has to be the last route
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ExpiredSessionComponent,
    ExpiredSessionModalComponent,
    AboutComponent,
    UnderConstructionPageComponent,
    EqualValidator
  ],
  entryComponents: [
    ExpiredSessionModalComponent
  ],
  providers: [
    HttpClientModule,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AuthGuard,
    AuthenticationService,
    AboutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
