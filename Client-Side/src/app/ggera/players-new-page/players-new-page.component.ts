import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-players-new-page',
  templateUrl: './players-new-page.component.html',
  styleUrls: ['./players-new-page.component.scss']
})
export class PlayersNewPageComponent implements OnInit {
  constructor(private _hero: HeroService, public _auth: HeroService,
    private router: Router) { }

  public privateUsers: any = [];
  privateUser1: any
  public tempData: any = [];
  public checkedUsers: any = [];

  public searchFilter: any = '';
  public rangeFilter:any=''
  

  query1 = 'All Pros';
  query2 = '';
  query3 = 0 ;
  query4 = 'Any';
  query5 = '';
  public modalOpen: boolean = false;


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

  filterUser(user: any) {
    return user.kills >= this.query3
  }

  singleUser(userDetail: any) {
    this.privateUser1 = userDetail
  }



  ngOnInit(): void {
    this._hero.getAllUsers()
      .subscribe((res) => {
        let filterDATA = res.filter((ol) => {
          return ol.proPlayer === true
        })
        this.privateUsers = filterDATA;
        this.tempData = filterDATA;
        this.privateUser1 = this.privateUsers[0]


      })


  }

  // singlePro(id:any){
  //   this.route.navigate([`/single-pro`],{ queryParams: { id: id }})
  // }


  coachReq(pro_id: any) {
    console.log('clicked')

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

  openForm() {
    this.modalOpen = true;
  }

  closeForm() {
    this.modalOpen = false;
  }

 
}
