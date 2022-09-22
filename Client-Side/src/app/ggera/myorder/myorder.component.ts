import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { HeroService } from 'src/app/hero.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RapidApiService } from 'src/app/services/rapid-api.service';
import e from 'express';
import { StoreService } from 'src/app/services/store.service';
import { filter, Observable, tap } from 'rxjs';
import { UserDetailedModel, UserModel } from 'src/app/common/interface/user.interface';


@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.scss']
})
export class MyorderComponent implements OnInit {

  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [{
      data: [45, 25, 40, 80],
    }],
    labels: ['June', 'July', 'August', 'September']
  };


  public donutColors = [
    {
      backgroundColor: [
        'rgba(92, 184, 92,1)',
        'rgba(255, 195, 0, 1)',
        'rgba(217, 83, 79,1)',
        'rgba(129, 78, 40, 1)',
        'rgba(129, 199, 111, 1)'
      ]
    }
  ];


  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  user$: Observable<UserDetailedModel>;
  subscribers: any;
  pendingSubscribers: any
  approvedSubscribers: any
  lobbies: any
  

  public modalOpen: boolean = false;
  proDetail: any


  constructor(
    private _heroService: HeroService, 
    private _auth: HeroService, 
    private _hero: HeroService,
    private router: Router,
    private _rapidApi: RapidApiService, 
    private store: StoreService) { }

  ngOnInit(): void {
    this.userData()
    this.coachingList()
    this.getProDetail()
  }

  coachingList() {
    let email = this._auth.getEmail()
    this._hero.getCoachingList()
      .subscribe((res) => {
        console.log('res',email, res)
        let filterDATA = res.filter((ol) => {
          return ol.pro === email && ol.approve === 'pending';
        })

        let newfilterData = res.filter((ol) => {
          return ol.pro === email && ol.approve === 'true';
        })
        this.pendingSubscribers = filterDATA;
        this.approvedSubscribers = newfilterData
        console.log('pending', this.pendingSubscribers)
      })
  }


  userData() {
    if (this._heroService.getEmail()) {
      this.user$ = this.store.currentUser$.pipe(
        filter(e => !!e),
        tap(e => {
        console.log('Console ~ e', e);
        this.getLobby(e?.platform || '', e)
        this._heroService.getCoach(e.email).subscribe(res => {
          this.subscribers = res
        })
      }));
    }
  }


  profile() {
    this.router.navigate(['/profile'])
  }


  approved(id: any, pro: any, sub: any) {

    this._hero.sendLinkApprove(id, pro, sub)
      .subscribe(
        {
          next: (res) => {
            if (res) {

              Swal.fire({
                icon: 'success',
                title: 'approved successfully',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                if (this._hero.isNormal()) {
                  this.router.navigate(['/home-page'])

                } else {
                  window.location.reload()
                }


              })

            }
          },
          error: (err) => {

            Swal.fire({
              icon: 'error',
              title: 'Network Error. Please try again',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/login'])

            })
          }
        })

  }

  rejected(id: any) {
    this._hero.sendLinkReject(id)
      .subscribe(
        {
          next: (res) => {
            if (res) {

              Swal.fire({
                icon: 'success',
                title: 'rejected successfully',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                if (this._hero.isNormal()) {
                  this.router.navigate(['/home-page'])

                } else {
                  window.location.reload()
                }


              })

            }
          },
          error: (err) => {

            Swal.fire({
              icon: 'error',
              title: 'Network Error. Please try again',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/login'])

            })
          }
        })
  }

  openForm() {
    this.modalOpen = true;
  }
  getProDetail() {
    let email = this._hero.getEmail()

    this._hero.getUserDetail(email)
      .subscribe(res => {
        this.proDetail = res
      })
  }

  getLobby(platform, user){
    let p = 'psn';
    if(platform == 'PS'){
      p= 'psn';
    } else if( platform == "Xbox"){
      p= 'xbl';
    }else if( platform == "Win"){
      p= 'acti'
    }
    this._rapidApi.getLobbies(p,user)
      .subscribe(res => {
        this.lobbies = res
        console.log(this.lobbies)
      })
  }
}
