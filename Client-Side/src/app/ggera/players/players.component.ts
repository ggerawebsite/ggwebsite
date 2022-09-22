import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  constructor(private _hero: HeroService, public _auth: HeroService,
    private router: Router) { }

  public privateUsers: any = [];
  public tempData: any = [];
  public checkedUsers: any = [];

  public searchFilter: any = '';
  query1 = 'All Pros';
  query2 = 'All';
  query3 = 'Any';
  query4 = 'Any';
  query5 = '';

  selectedItem: any = {
    profile_pic: '',
    username: '',
    country: '',
    kd: '',
    kills: '',
    platform: '',
    email: ''

  };

  checkboxFilter = {
    win: true,
    ps: true,
    xbox: true
  }

  filterChange() {
    this.privateUsers = this.tempData.filter((x) => {

      return (x.platform === 'PS' && this.checkboxFilter.ps)
        || (x.platform === 'Xbox' && this.checkboxFilter.xbox)
        || (x.platform === 'Win' && this.checkboxFilter.win)
    })
    console.log('After-uncheck', this.privateUsers)
  }




  ngOnInit(): void {
    this._hero.getAllUsers()
      .subscribe((res) => {
        let filterDATA = res.filter((ol) => {
          return ol.proPlayer === true
        })
        this.privateUsers = filterDATA;
        this.tempData = filterDATA;
       
        })
       

  }

  // singlePro(id:any){
  //   this.route.navigate([`/single-pro`],{ queryParams: { id: id }})
  // }


  coachReq(pro_id: any) {
    let email = this._auth.getEmail()
    this._auth.coach(email, pro_id)
      .subscribe(
        {
          next: (res) => {
            if (res) {

              Swal.fire({
                icon: 'success',
                title: 'Request Send',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                // this.router.navigate(['/players'])
              })

            }
          },
          error: (err) => {
            if (err.status === 409) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                // this.router.navigate(['/players'])

              })
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Network Error. Please try again',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/login'])

              })
            }
          }
        }

      )
  }
}
