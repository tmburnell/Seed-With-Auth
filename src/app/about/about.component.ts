import {Component, OnInit} from '@angular/core';

import {AboutService} from 'app/_common/services';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public staticVersion: any;
  public staticVersionString: string;
  public apiVersion: any;
  public apiVersionString: string;

  constructor(public aboutService: AboutService) {
  }

  ngOnInit() {
    this.aboutService.getStaticVersion().subscribe((version) => {
      this.staticVersion = version;
      this.staticVersionString = JSON.stringify(version, null, 4);
    });

    this.aboutService.getApiVersion().subscribe((version) => {
      this.apiVersion = version;
      this.apiVersionString = JSON.stringify(version, null, 4);
    });
  }
}
