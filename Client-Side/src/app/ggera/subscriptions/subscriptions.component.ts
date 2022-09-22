import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  constructor(private _heroService: HeroService, private router: Router) { }

  paymentHandler: any = null;

  success: boolean = false

  failure: boolean = false
  subscriptionData:any;


  ngOnInit(): void {
    this._heroService.getSubscriptionData().
    subscribe((data)=>{
      this.subscriptionData=data;
      // console.log(data);
    })

  }


  newStripe() {
    this._heroService.newStripe(50)
      .subscribe(res => {
        window.location.href = res.url;    
        })
  }

}
