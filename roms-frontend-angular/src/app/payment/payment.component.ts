import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDataService } from '../service/data/confirmation-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  id:any
  total:any
  name:any
  day:any
  constructor(private router: Router,private route:ActivatedRoute,
    private confirmationService:ConfirmationDataService){}
  ngOnInit() {
     this.name = this.confirmationService.getUserName();
    this.id=this.confirmationService.getRequestId();
    this.day=this.confirmationService.getDateOfDelivery();
    this.total=this.confirmationService.getTotal() +" INR"
  }
  onSubmit(): void {
    
        this.router.navigate(['todo'])
        
    
  }
}

