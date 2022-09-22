import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  constructor(private _heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
  }
  proRequestHandler(){
    this._heroService.proRequestHandler().pipe(tap(()=>{this.router.navigate(['/make-me-pro/step-2'])}))
    .subscribe()
  }

}
