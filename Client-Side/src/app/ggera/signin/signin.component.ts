import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { HeroService } from '../../hero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private authService: SocialAuthService,
    private router: Router,
    private _heroService: HeroService,
    private _auth: HeroService,

    private activated: ActivatedRoute
  ) { }



  modal: boolean = false
  socialUser!: SocialUser;
  isLoggedin: boolean = false;
  otp: boolean = false
  discordFlag: boolean = false
  URLid: any;
  userNavTo: string;
  user:any;

  ngOnInit(): void {


    // this.URLid = this.activated.snapshot.paramMap.get('id');
    // console.log("id", this.URLid)
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);

      if (this.socialUser != null) {

        // save to DB ,also check
        this._heroService.googleSave(this.socialUser)
          .subscribe(
            {
              next: (res) => {
                if (res) {
                  localStorage.setItem('accessToken', res.accessToken)

                  Swal.fire({
                    icon: 'success',
                    title: 'Sign In successfully',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(() => {

                    setTimeout(() => {
                      this.router.navigate(['/profile'])
                    }, 1000);

                  })

                }
              },
              error: (err) => {
                if (err.status === 409) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Email ID already registered',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(() => {
                    this.router.navigate(['/login'])
                    this.modal = false

                  })
                }
                else {
                  Swal.fire({
                    icon: 'error',
                    title: 'ENetwork Error. Please try again',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(() => {
                    this.router.navigate(['/login'])
                    this.modal = false

                  })
                }
              }
            }

          )


      }
      else {
        console.log("no", this.socialUser)
      }
    });


  }




  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log(res, "res")
        setTimeout(() => {
          this.router.navigate(['/profile'])
        }, 1000);
      })

  }



  signInWithDiscord() {
    this._heroService.discordSign()
      .subscribe(
        {
          next: (res) => {
            if (res) {
              localStorage.setItem('accessToken', res.accessToken)
              Swal.fire({
                icon: 'success',
                title: 'Sign Up successfully',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/dashboard'])
              })

            }
          },
          error: (err) => {
            if (err.status === 401) {
              Swal.fire({
                icon: 'error',
                title: 'Wrong OTP. Enter Again',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/login'])

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
        })
  }

  signOut(): void {
    this.authService.signOut();
  }
  switch() {
    this.modal = !this.modal

  }


  signIn() {
    this.router.navigate(['/dashboard'])
  }

  // login

  SignUpForm: any = new FormGroup({
    'email': new FormControl(''),

  })

  OTPForm: any = new FormGroup({
    'otp': new FormControl('')

  })

  SignUp() {

    let SignUpData = this.SignUpForm.value;
    this._heroService.signupGo(SignUpData)
      .subscribe(
        {
          next: (res) => {
            if (res) {

              let emailTocheck = res.email
              if (emailTocheck) {
                localStorage.setItem('email', res.email)
              }
              this.otp = true;

            }
          },
          error: (err) => {
            if (err.status === 409) {
              Swal.fire({
                icon: 'error',
                title: 'Email ID already registered with different provider',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/login'])
                this.modal = false

              })
            }
            else if (err.status === 422) {
              Swal.fire({
                icon: 'error',
                title: 'Enter proper email id',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/login'])
                this.modal = false

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
                this.modal = false

              })
            }
          }
        }

      )
  }

  OTP() {
    let OTPdata = this.OTPForm.value;
    let email = localStorage.getItem('email')
    this._heroService.OTPGo(OTPdata, email)
      .subscribe(
        {
          next: (res) => {
            if (res) {
              localStorage.setItem('accessToken', res.accessToken)
              console.log('res'  , res)
              this.userData(res);
              // Swal.fire({
              //   icon: 'success',
              //   title: 'Sign Up successfully',
              //   showConfirmButton: false,
              //   timer: 1500
              // }).then(() => {
              //   localStorage.removeItem('email')
              //   if(res.isAdmin) {
              //     this.router.navigate(['/admin/dashboard'])
              //   }
              //   else {
              //     this.router.navigate(['/profile'])
              //   }

              // })

            }
          },
          error: (err) => {
            if (err.status === 401) {
              Swal.fire({
                icon: 'error',
                title: 'Wrong OTP. Enter Again',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/login'])

              })
            } else if (err.status === 422) {
              Swal.fire({
                icon: 'error',
                title: 'Enter OTP.',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/login'])
                this.modal = false

              })
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Network Error. Please try again',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                localStorage.removeItem('email')
                this.router.navigate(['/login'])

              })
            }
          }
        })
  }


  userData(res:any) {
    if(this._heroService.getEmail()){
      console.log("hiii");
      let email = this._heroService.getEmail()
      this._heroService.getUserDetail(email).
        subscribe(res => {
          this.user = res
         
        })
        Swal.fire({
          icon: 'success',
          title: 'Sign Up successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          localStorage.removeItem('email')
          console.log(this.user);
          if(this.user.discord_id && this.user.phone_number && this.user.email && this.user.country && this.user.gamerID){
            if(res.isAdmin) {
              this.router.navigate(['/admin/dashboard'])
            }else if(this.user.proPlayer) {
              this.router.navigate(['/profile'])
            } else{
              this.router.navigate(['/lobby-listing-subscriber'])
            }
          }else{
            this.router.navigate(['/profile'])
          }
          // if(res.isAdmin) {
          //   this.router.navigate(['/admin/dashboard'])
          // }
          // else {
          //   this.router.navigate(['/profile'])
          // }

        })
    }
  }

}
