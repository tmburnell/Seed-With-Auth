import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-expired-session',
    templateUrl: 'expired-session-modal.component.html',
    styleUrls: ['expired-session-modal.component.scss']
})

export class ExpiredSessionModalComponent {
    constructor(private router: Router,
                private dialogRef: MatDialogRef<ExpiredSessionModalComponent>) {
    }

    reload() {
        this.router.navigate(['/login']);
        this.dialogRef.close();
    }
}
