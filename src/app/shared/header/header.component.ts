import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from "../../clients/login.service";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  mobile : boolean;

  constructor(private auth : LoginService, private router : Router, private dev: DeviceDetectorService) { }

  public ngOnInit() {
    this.mobile = this.dev.isMobile();
  }

  public isLoggedIn() : boolean {
    return this.auth.isLoggedIn();
  }

  logoutClicked() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
