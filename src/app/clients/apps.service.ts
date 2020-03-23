import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppsService {
  private map: Map<string, string>;

  public constructor() {
    this.map = new Map<string, string>();

    this.map.set('dashboard', 'http://dashboard.dev.sensateiot.com:4200');
    this.map.set('login', 'http://login.dev.sensateiot.com');
  }

  public forward(app: string, path = '') {
    if(!this.map.has(app)) {
      return;
    }

    window.location.href = `${this.map.get(app)}${path}`;
  }
}
