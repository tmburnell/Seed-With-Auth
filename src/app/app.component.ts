import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {AuthenticationService} from 'app/_common/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  private redirectUrl = '/';


  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // this.router.events.filter(e => e instanceof NavigationStart).pairwise().subscribe((nav: any) => {
    //     this.redirectUrl = nav[0].url;
    // });

    this.authenticationService.loginSuccess.subscribe(() => {
      this.router.navigateByUrl(this.redirectUrl);
    });

    this.authenticationService.timeout.subscribe(() => {
      this.router.navigate(['sessionExpired']);
    });
  }

  isAuthenticated(): boolean {
    return !!this.authenticationService.getCurrentUser();
  }

  logout(){
    this.authenticationService.logout();
  }
}
