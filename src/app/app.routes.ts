
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {ConfirmEmailComponent} from "./pages/confirm-email/confirm-email.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {RegisterComponent} from "./pages/register/register.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'confirm/:id/:token', component: ConfirmEmailComponent},
  {path: 'reset-password/:email', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: '*', redirectTo: '/login'},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

export const Routing = RouterModule.forRoot(routes);
