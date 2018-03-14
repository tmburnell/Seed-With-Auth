import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

import {ExpiredSessionModalComponent} from './modal';
import {AuthenticationService} from 'app/_common/services';

@Component({
  selector: 'app-session-experation',
  templateUrl: 'expired-session.component.html',
  styleUrls: ['expired-session.component.scss']
})
export class ExpiredSessionComponent implements OnInit {

  constructor(private matDialog: MatDialog, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    if (this.authenticationService.getCurrentUser()) {
      this.authenticationService.clearUser();

      this.authenticationService.getUser().subscribe(() => {
        this.authenticationService.emitValidUser();
      }, err => {
        this.openSessionTimeout();
      });
    } else {
      this.authenticationService.logout();
    }
  }

  openSessionTimeout() {
    this.matDialog.open(ExpiredSessionModalComponent, {
      width: '450px',
      disableClose: true
    });
  }
}
