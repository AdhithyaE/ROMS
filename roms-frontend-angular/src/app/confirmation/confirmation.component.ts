import { Component, OnInit } from '@angular/core';
import { RequestDataService } from '../service/data/request-data.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDataService } from '../service/data/confirmation-data.service';
import {formatDate} from '@angular/common';

export class Request {
  constructor(

    public userName: string,
    public contactNumber:number,
    public cardNumber:number,
    public isPriorityRequest: boolean,

    public componentType:String,
    public componentName:string,
    public quantity:number

  ){

  }
}
export class Confirmation{
  constructor(
      public userName: string,
      public requestId:string,
      public  processingCharge:number,
      public  packageAndDeliveryCharge:number,
      public dateOfDelivery: Date,
      public total:number
  
  ){}
}
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  message=''
  request: any
  confirmation:any
  token: any
  userName=sessionStorage.getItem('userName')
 requestId:any
  processingCharge:any
  packageAndDeliveryCharge:any
  dateOfDelivery:any
  total:any
  name:any
     
  constructor(
    private requestService:RequestDataService,
    private tokenStorage:TokenStorageService,
    private router : Router,
    private route:ActivatedRoute,
    private confirmationService:ConfirmationDataService,
  ) { }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('userName');
    this.requestId=this.confirmationService.getRequestId()
    this.dateOfDelivery=this.confirmationService.getDateOfDelivery()
    this.requestId=this.confirmationService.getRequestId()
    this.packageAndDeliveryCharge=this.confirmationService.getPackageAndDeliveryCharge()
    this.processingCharge=this.confirmationService.getProcessingCharge()
    this.total=this.confirmationService.getTotal()
  }




  refreshRequest(){
    this.requestService.createRequest(this.tokenStorage.getToken,this.request).subscribe(
      response => {
        console.log(response);
        
      }
    )
  }
  reloadPage(): void {
     }
   setConfirmation(data:any,request:any){

   }

  addRequest(){
   this.router.navigate(['payment'],this.name)
   }
  
  
}
