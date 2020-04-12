import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from "../../clients/alert.service";
import {AccountService} from "../../clients/account.service";
import {Title} from "@angular/platform-browser";

class ResetErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const submitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || submitted));
  }
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm : FormGroup;
  public email : FormControl;
  public password : FormControl;
  public confirmPassword : FormControl;
  public token : FormControl;
  public first : boolean = true;
  public matcher : ResetErrorStateMatcher = new ResetErrorStateMatcher();

  public constructor(private accounts : AccountService, private alerts : AlertService,
              private readonly title: Title,
              private router : Router, private route : ActivatedRoute) {
    this.title.setTitle('Login | Sensate IoT')

    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.route.queryParams.subscribe(params => {
      this.email.patchValue(params['email'] || '');
    });
  }

  public ngOnInit() {
    this.first = true;

    this.password = new FormControl('', Validators.required);
    this.confirmPassword = new FormControl('', Validators.required);
    this.token = new FormControl('', Validators.required);

    this.forgotPasswordForm = new FormGroup({
      email : this.email,
      password : this.password,
      confirmPassword : this.confirmPassword,
      token : this.token
    });

    this.confirmPassword.valueChanges.subscribe(value => {
      this.setPasswordMatch();
    });

    this.password.valueChanges.subscribe(value => {
      this.setPasswordMatch();
    });
  }

  private setPasswordMatch() : void {
    if(this.password.value === this.confirmPassword.value) {
      this.confirmPassword.setErrors(null);
    } else {
      this.confirmPassword.setErrors({
        'match': true
      });
    }
  }

  public isValid() : boolean {
    if(this.first)
      return this.email.valid && this.password.valid && this.token.valid;

    return true;
  }

  public onSubmitClicked() {
    this.first = false;
    let email = this.email.value.toString();
    let pw = this.password.value.toString();
    let token = this.token.value.toString();

    this.accounts.confirmResetPassword(email, token, pw).subscribe(value => {
      this.alerts.showNotification('Password has successfully been reset!', 'top-center', 'success');
      this.router.navigate(['/login']);
    }, error => {
      console.debug("Unable to reset password!");
      console.debug(error);

      switch(error.status) {
        case 404:
          this.alerts.showNotification('Unknown email address!', 'top-center', 'warning');
          break;

        case 400:
          let msg = error.error.message || 'UNKOWN ERROR!';
          this.alerts.showNotification('Unable to reset password: ' + msg, 'top-center', 'warning');
          break;
      }
    });
  }
}
