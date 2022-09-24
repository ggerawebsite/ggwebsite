import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HeroService } from 'src/app/hero.service';
import { tap, filter, Observable, map } from 'rxjs';
import { FormControl } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { UserDetailedModel, UserModel, WalletModel } from 'src/app/common/interface/user.interface';
import { WalletService } from 'src/app/services/wallet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {



  user$:Observable<UserModel>;
  wallet$:Observable<WalletModel>;

  games: any;
  selectStatus: any;
  user: any;
  selectedGame: FormControl = new FormControl('');

  constructor(
    private router: Router,
    private _heroService:HeroService,
    public _auth:HeroService,
    private store: StoreService,
    private walletService: WalletService
  ) {  }

  ngOnInit(): void {
    this.userData();
    this.getGameData()
  }

  getGameData() {
    this._heroService.getAllGames().pipe(
      tap(e => {
        this.games = e;
      })
    ).subscribe();
  }

  private checkForValueChange() {
    this.selectedGame.valueChanges.pipe(
      tap(e => {
        this.store.selectedGame = e;
        this._heroService.updatePreference({selectedGame: e}).subscribe()
      })
    ).subscribe()
  }

  private getWalletData(userId) {
    this.wallet$ = this.walletService.getUserWalletData(userId).pipe(tap(e => {
      this.store.wallet = e;
    }))
  }

  Wallet() {
    this.router.navigate(['/wallet'])
  }
  Rank() {
    this.router.navigate(['/ranks'])
  }


  Profile() {
    this.router.navigate(['/profile'])
  }

  myOrders() {
    this.router.navigate(['/my-orders'])
  }

  myOrders2() {
    this.router.navigate(['/my-orders2'])
  }

  Stats() {
    this.router.navigate(['/stats'])
  }

  Coaching(){
    this.router.navigate(['/coaching-programme'])

  }

  PreParty(){
    this.router.navigate(['/join-party'])
  }

  PreParty2(){
    this.router.navigate(['/pre-party'])
  }

  referals(){
    this.comingSoon();
    // this.router.navigate(['/referrals'])

  }

  account(){
    this.router.navigate(['/account'])

  }
  Players(){
    this.router.navigate(['/players'])

  }
  Logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }


  userData() {
    this.user$ = this._heroService.getMyDetail().pipe(
        map((e) => e.data),
        tap((e: UserDetailedModel) => {
            this.store.currentUser = e;
            this.user=e;
            this.selectStatus=this.user.status;
            if(e?.preference?.selectedGame) this.selectedGame.setValue(e?.preference?.selectedGame);
            this.checkForValueChange();
            this.getWalletData(e._id);
        })
    );
    // if (this._heroService.getEmail()) {
    //     let email = this._heroService.getEmail();
    //     this._heroService
    //         .getUserDetail(email)
    //         .pipe(
    //             filter((e) => e),
    //             tap((res) => {
    //                 this.user = res;
    //                 this.store.currentUser = res;
    //             })
    //         )
    //         .subscribe();
    // }
 
  }
  comingSoon(){
    this.router.navigate(['/coming-soon'])
  }
  support(){
    this.router.navigate(['/support'])
  }
  settings(){
    this.router.navigate(['/settings'])
  }
  subscriptions(){
    this.router.navigate(['/subscriptions'])
  }

  onStatusChange(entry): void {
    this.selectStatus = entry;
    console.log(this.selectStatus);
    console.log(this.user._id);
    this._heroService.changeStatus(this.selectStatus, this.user._id)
      .subscribe(
        {
          next: (res) => {
            if (res) {

              Swal.fire({
                icon: 'success',
                title: 'Updated successfully',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.selectStatus = entry


              })

            }
          }
        })
}
}
