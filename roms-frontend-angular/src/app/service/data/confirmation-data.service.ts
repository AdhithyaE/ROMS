import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDataService {

  constructor() { }
setData(data:any){
  localStorage.setItem('total',data.packageAndDeliveryCharge+data.processingCharge)
  localStorage.setItem('dateOfDelivery',formatDate(data.dateOfDelivery, 'MMM d, y', 'en-US'))
  localStorage.setItem('requestId',data.requestId)
  localStorage.setItem('packageAndDeliveryCharge',data.packageAndDeliveryCharge)
  localStorage.setItem('processingCharge',data.processingCharge)
}
setUserName(name:string){
localStorage.setItem('uname',name)
}
getUserName(){
  return localStorage.getItem('uname')
}
getRequestId(){
  return localStorage.getItem('requestId')
}
getTotal(){
  return localStorage.getItem('total')
}
getDateOfDelivery(){
  return localStorage.getItem('dateOfDelivery')
}
getPackageAndDeliveryCharge(){
  return localStorage.getItem('packageAndDeliveryCharge')
}
getProcessingCharge(){
  return localStorage.getItem('processingCharge')
}
  

}
