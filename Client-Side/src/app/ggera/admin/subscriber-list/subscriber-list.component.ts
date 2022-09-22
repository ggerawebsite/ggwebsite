import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AdminService } from "src/app/common/service/admin.service";

@Component({
  selector: 'app-subscriber-list',
  templateUrl: './subscriber-list.component.html',
  styleUrls: ['./subscriber-list.component.scss']
})
export class SubscriberListComponent implements OnInit {
  subUsers$:Observable<any>;
  constructor(private adminservice:AdminService) { }

  ngOnInit(): void {
    this.subUsers$=this.adminservice.getSubscriberUsers()
    .pipe(tap(e=>{
      console.log(e)
    }))
  
  
  }

}
