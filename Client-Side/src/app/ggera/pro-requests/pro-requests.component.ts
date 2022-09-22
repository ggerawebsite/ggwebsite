import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from 'src/app/hero.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pro-requests',
  templateUrl: './pro-requests.component.html',
  styleUrls: ['./pro-requests.component.scss']
})
export class ProRequestsComponent implements OnInit {


  subscribers: any

  constructor(private _auth: HeroService,
    private _hero: HeroService, private router: Router) { }

  ngOnInit(): void {
    let email = this._auth.getEmail()
    this._hero.getCoachingList()
      .subscribe((res) => {
        let filterDATA = res.filter((ol) => {
          return ol.pro === email && ol.approve === 'pending';
        })
        this.subscribers = filterDATA;
        console.log('listss', this.subscribers)
      })

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
}
