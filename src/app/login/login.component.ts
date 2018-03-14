import {Component, OnInit, ViewContainerRef, ViewChild, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from "@angular/material";

import {Login, User} from 'app/_common/models';
import {AuthenticationService} from 'app/_common/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public title = 'Seed Project';
  public user: Login = new Login;
  public newUser: any = new User;
  public errorMsg: string;
  public loading = false;
  public authTypeIndex: number;

  @ViewChild('loginContainer', { read: ViewContainerRef }) loginContainer: ViewContainerRef;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.data.subscribe((data?: any) => {
      if (data.title) {
        this.title = data.title;
      }
    });
  }

  login() {
    this.loading = true;
    this.clearErrorMsg();

    this.authenticationService.login(this.user).subscribe(() => {
        // The service fired an event for the app to change the route.
      },
      (err) => {
        this.errorMsg = err.error.message;
        this.loading = false;
      });
  }

  createUser() {
    this.loading = true;
    this.clearErrorMsg();

    this.authenticationService.createUser(this.newUser).subscribe(() => {
        this.loading = false;
        this.authTypeIndex = 0;
      },
      (err) => {
        this.errorMsg = err.error.message;
        this.loading = false;
      });
  }

  clearErrorMsg() {
    this.errorMsg = undefined;
  }

}
