import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
//const AUTH_API = 'http://load-balancer-adhi-1246553545.ap-northeast-1.elb.amazonaws.com:8085/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public isLoginFailed = false;
  constructor(private http: HttpClient) { }

  login(credentials:any): Observable<any> {
    return this.http.post(API_URL + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  
}
