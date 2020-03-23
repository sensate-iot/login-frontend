/*
 * User account API services.
 *
 * @author Michel Megens
 * @email  dev@bietje.net
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserRegistration} from '../models/user-registration.model';
import {Status} from '../models/status.model';

@Injectable()
export class AccountService {
  private readonly options : any;

  constructor(private http : HttpClient) {
    this.options = {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
  }

  public confirmRegistration(userId: string, token: string) {
    const url = `${environment.authApiHost}/accounts/confirm/${userId}/${token}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(url, {
      observe: 'response',
      headers: headers
    });
  }

  public resetPassword(email : string) {
    const data = {
      "Email" : email
    };

    return this.http.post(environment.authApiHost + '/accounts/forgot-password', data, {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  public confirmResetPassword(email : string, token : string, newpass : string) {
    const data = {
      "Email" : email,
      "Password" : newpass,
      "Token" : token
    };

    return this.http.post(environment.authApiHost + '/accounts/reset-password', data, {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  public register(user : UserRegistration, forward : string) {
    const data = {
      "Email" : user.email,
      "Password" : user.password,
      "FirstName" : user.firstName,
      "LastName": user.lastName,
      "PhoneNumber" : user.phoneNumber,
      "ForwardTo": forward
    };

    return this.http.post(environment.authApiHost + '/accounts/register', data, this.options);
  }

  public rawCheckPhoneConfirmed() {
    return this.http.get<Status>(environment.authApiHost + '/accounts/phone-confirmed', {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
