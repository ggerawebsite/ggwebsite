import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  constructor(private _hero:HeroService) { }

  public privateUsers: any;
  public subscribers: any;



  ngOnInit(): void {

    this._hero.getAllUsers()
    .subscribe((res) => {
      let filterDATA = res.filter((ol) => {
        return ol.proPlayer === true
      })
      this.privateUsers = filterDATA;


      let subDATA = res.filter((ol)=>{
        return ol.proPlayer ===false && ol.superAdmin===false
      })

      this.subscribers = subDATA;
    })

  }

}
