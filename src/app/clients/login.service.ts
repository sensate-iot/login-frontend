/*
 * Login service.
 *
 * @author Michel Megens
 * @email  dev@bietje.net
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Jwt} from '../models/jwt.model';
import {ApiKeyService} from './apikey.service';
import {AccountService} from './account.service';
import {CookieService} from 'ngx-cookie-service';
import * as moment from "moment";

@Injectable()
export class LoginService {
  private readonly host: string;
  private readonly options: any;
  private static AuthCookie = 'SensateIoTAuth';

  public constructor(private http : HttpClient,
                     private readonly accounts: AccountService,
                     private readonly cookies: CookieService,
                     private readonly keys: ApiKeyService) {
    this.options = {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    this.host = window.location.hostname.replace(/^[^.]+\./g, "");
  }

  public readAuthCookie() {
    const data = this.cookies.get(LoginService.AuthCookie);

    if(data === null || data.length <= 0) {
      return;
    }

    const json = atob(data);
    return JSON.parse(json);
  }

  public login(user: string, password: string) {
    const body = {
      "Email": user,
      "Password": password
    };

    localStorage.removeItem('userId');
    return this.http.post<Jwt>(environment.authApiHost + '/tokens/request', body, {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Cache-Control', 'no-cache')
    });
  }

  public isLoggedIn() : boolean {
    let jwt = this.readAuthCookie();

    if(jwt === null || jwt === undefined) {
      return false;
    }

    return jwt.refreshToken != null;
  }


  public logout() {
    const jwt = this.getJwt();

    if(jwt == null || jwt.refreshToken == null) {
      this.resetLogin();
      return;
    }

    const key = localStorage.getItem('syskey');

    if(key != null) {
      this.keys.revokeByKey(key).subscribe(() => {
        console.debug('System API key revoked!');
      });
    }

    this.http.delete(environment.authApiHost + '/tokens/revoke/' + jwt.refreshToken, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Cache-Control', 'no-cache')
    }).subscribe(() => {
      this.resetLogin();
    }, () => {
      console.debug('Unable to logout on server!');
      this.resetLogin();
    });
  }

  public getJwt() : Jwt {
    const data = localStorage.getItem('jwt');

    if(!data) {
      return null;
    }

    return JSON.parse(data, function (key, value) {
      if(value !== '')
        return value;

      let result = new Jwt();
      result.expiresInMinutes = value.expiresInMinutes;
      result.jwtExpiresInMinutes = value.jwtExpiresInMinutes;
      result.jwtToken = value.jwtToken;
      result.refreshToken = value.refreshToken;
      result.email = value.email;
      return result;
    });
  }

  public resetLogin() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('roles');
    localStorage.removeItem('admin');
    localStorage.removeItem('apps');
    localStorage.removeItem('userId');
    localStorage.removeItem('phone-confirmed');
    localStorage.removeItem('syskey');
    console.debug(`Removing cookie!`);
    this.cookies.delete(LoginService.AuthCookie, null, this.host);
  }

  public setSession(data : Jwt) {
    const now = moment().add(data.expiresInMinutes, 'minutes').toDate();

    const cookie = btoa(JSON.stringify(data));
    console.debug(`Setting cookie for: ${this.host}`);
    this.cookies.set(LoginService.AuthCookie, cookie, now, '/', this.host);
  }
}
