import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from './service/route-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import {PaymentComponent} from './payment/payment.component';
import { RequestComponent } from './request/request.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
const routes: Routes = [
  { path: '', component: LoginComponent  },//canActivate, RouteGuardService
  { path: 'login', component: LoginComponent },
  { path: 'confirmation/:name', component: ConfirmationComponent},
  { path: 'request', component: RequestComponent},
  { path: 'logout', component: LogoutComponent },
  {path:'payment',component:PaymentComponent},
  {path: '**', component: ErrorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }