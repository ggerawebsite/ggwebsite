import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor(private _heroService: HeroService, private router: Router) { }

  paymentHandler: any = null;

  success: boolean = false

  failure: boolean = false


  ngOnInit(): void {

  }

  newStripe() {
    this._heroService.newStripe(50)
      .subscribe(res => {
        window.location.href = res.url;    
        })
  }

}
