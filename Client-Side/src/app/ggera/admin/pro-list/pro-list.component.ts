import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AdminService } from 'src/app/common/service/admin.service';

@Component({
  selector: 'app-pro-list',
  templateUrl: './pro-list.component.html',
  styleUrls: ['./pro-list.component.scss']
})
export class ProListComponent implements OnInit {
  proUsers$:Observable<any>;
  constructor(private adminservice:AdminService) { }

  ngOnInit(): void {
    this.proUsers$=this.adminservice.getProUsers()
    .pipe(tap(e=>{
      console.log(e)
    }))
  }
  getProfile(id){
    this.adminservice.getProfile(id)
    // console.log('id',id)

  }

}
