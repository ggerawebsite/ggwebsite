import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-single-pro',
  templateUrl: './single-pro.component.html',
  styleUrls: ['./single-pro.component.scss']
})
export class SingleProComponent implements OnInit {

  constructor(private _hero: HeroService, 
    private _route: ActivatedRoute,
    public _auth:HeroService,
    private router:Router
    ) { }

  id: any;
  user: any;

  ngOnInit(): void {

    this._route.queryParams
      .subscribe((params) => {
        this.id = params['id'];
      })

    this._hero.getUserById(this.id)
      .subscribe(res => {
        this.user = res;
      })

  }


  coachReq(pro_id:any) {
    let email = this._auth.getEmail()
    this._auth.coach(email,pro_id)
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
                this.router.navigate(['/players'])
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
                this.router.navigate(['/players'])

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
