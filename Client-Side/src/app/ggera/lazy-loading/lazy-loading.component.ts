import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lazy-loading',
  templateUrl: './lazy-loading.component.html',
  styleUrls: ['./lazy-loading.component.scss']
})
export class LazyLoadingComponent implements OnInit {


  code: any;
  completeCheck: Boolean = false


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe((params) => {
        this.code = params['token'];
        this.completeCheck = params['completeCheck']
        console.log(this.code);

      })

    if (this.code) {
      localStorage.setItem('accessToken', this.code)
      Swal.fire({
        icon: 'success',
        title: 'Sign Up successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        if (this.completeCheck) {
          this.router.navigate(['/profile'])

        } else {
          this.router.navigate(['/profile'])

        }
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
