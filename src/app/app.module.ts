import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import { HeaderComponent } from './shared/header/header.component';
import {Routing} from "./app.routes";
import { LoginComponent } from './pages/login/login.component';
import {DeviceDetectorModule} from "ngx-device-detector";
import {CookieService} from "ngx-cookie-service";
import {LoginService} from "./clients/login.service";
import {AccountService} from "./clients/account.service";
import {AlertService} from "./clients/alert.service";
import {ApiKeyService} from "./clients/apikey.service";
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmEmailComponent
  ],
  imports: [
    DeviceDetectorModule.forRoot(),
    Routing,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  providers: [
    CookieService,
    LoginService,
    AccountService,
    AlertService,
    ApiKeyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
