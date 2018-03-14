import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from 'app/_common/guards';

import {LoginComponent} from './login';
import {ExpiredSessionComponent} from './session-experation';

import {AboutComponent} from './about';
import {UnderConstructionPageComponent} from './under-construction-page';

const appRoutes: Routes = [
    // {path: '', component: NamespacesComponent},
    {path: 'about', component: AboutComponent},

    {path: 'construction', component: UnderConstructionPageComponent, canActivate: [AuthGuard]},
    {path: 'sessionExpired', component: ExpiredSessionComponent},
    {path: 'login', component: LoginComponent, data: {title: 'My Seed Project'}},

    // otherwise redirect to home
    {path: '**', redirectTo: 'construction'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}

