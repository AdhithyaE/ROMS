import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestDataService } from './../service/data/request-data.service';
import { Request,Confirmation } from '../confirmation/confirmation.component';
import { Token } from '@angular/compiler';
import {TokenStorageService} from '../service/token-storage.service'
import { ConfirmationDataService } from '../service/data/confirmation-data.service';
import { DOCUMENT } from '@angular/common'; 
import { Inject }  from '@angular/core';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  id=0
  request: any
   userName=''
   contactNumber:any
   cardNumber=0
  isPriorityRequest=false
 errorMessage=false
  componentType:any
  componentName=''
  quantity=0
 conform:any
  constructor(
    @Inject(DOCUMENT) document: Document,
    private requestService: RequestDataService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService:ConfirmationDataService
  ) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];
    this.request=new Request(this.userName,this.contactNumber,this.cardNumber,
      this.isPriorityRequest,this.componentType,this.componentName,this.quantity)
   if(localStorage.getItem('request')!=null){
    var retrievedObject = localStorage.getItem('request');
    this.request = retrievedObject !== null ? JSON.parse(retrievedObject): new Request(this.userName,this.contactNumber,this.cardNumber,
      this.isPriorityRequest,this.componentType,this.componentName,this.quantity)
   }
  }

  saveRequest() {
    if(this.request.userName!='' && this.request.contactNumber!='' && this.request.componentName!=''){
      this.requestService.createRequest(this.tokenStorage.getToken(), this.request)
          .subscribe (
            data => {
                this.requestService.setData(this.request);
                this.confirmationService.setData(data)
                this.confirmationService.setUserName(this.request.userName)
                sessionStorage.setItem('userName',this.request.userName)
              
              this.router.navigate(['confirmation',this.request.userName])
            },
            err => {
              this.errorMessage = err.error.message;
              console.log(this.errorMessage);
            this.errorMessage=true
            }
          )
          }else{
  this.errorMessage=true
          }
  }
   checkHighPriority(that:any) {
    if (that === "integral") {
      (<HTMLInputElement>document.getElementById("ifYes")).style.display = "block";
    } else {
      (<HTMLInputElement>document.getElementById("ifYes")).style.display = "none";
    }
}
}
