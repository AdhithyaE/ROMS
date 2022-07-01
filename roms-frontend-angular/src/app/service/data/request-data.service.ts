import { Injectable } from '@angular/core';
import { COMP_API_URL } from './../../app.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Request,Confirmation, ConfirmationComponent } from '../../confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class RequestDataService {
  constructor(
    private http:HttpClient,
    
  ) { }
  setData(data:any){
    localStorage.setItem('request',JSON.stringify(data))
  }

  createRequest(token:any,request:any){
    const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'token'})
  };
    
    return this.http.post<any>(
              `${COMP_API_URL}/createReturnRequest`
                ,request
                ,httpOptions
                );
  }

}
