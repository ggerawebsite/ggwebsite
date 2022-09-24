import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroService } from 'src/app/hero.service';
import { LobbyService } from 'src/app/services/lobby.service';
import { RapidApiService } from 'src/app/services/rapid-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lobby-listing-subscriber',
  templateUrl: './lobby-listing-subscriber.component.html',
  styleUrls: ['./lobby-listing-subscriber.component.scss']
})
export class LobbyListingSubscriberComponent implements OnInit {

  user: any;
  lobbies: any

  joinLobbyForm: any = new FormGroup({
    lobbyData: new FormControl(""),
    userId: new FormControl(""),
});

  constructor( 
    private _hero: HeroService, 
    private _rapidApi: RapidApiService,
    private _lobby: LobbyService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.userData()
  }

  userData() {
    if (this._hero.getEmail()) {
      let email = this._hero.getEmail()
      this._hero.getUserDetail(email).
        subscribe(res => {
          this.user = res
          this.getLobby(this.user.platform)
        })
    }
  }
  getLobby(platform){
    let p;
    if(platform == 'PS'){
      p= 'psn';
    } else if( platform == "Xbox"){
      p= 'xbl';
    }else if( platform == "Win"){
      p= 'acti'
    }
    this._rapidApi.getLobbiesForUser('psn','Amartin743')
      .subscribe(res => {
        this.lobbies = res
        console.log(this.lobbies)
      })
  }

  joinLobby(lobby: any){
    console.log(lobby)
    // console.log(this.user._id)
    this._lobby.joinLobby(lobby,this.user, 'Amartin743')
      .subscribe(res => {
        console.log(res)
        if(res.data == 'Stopped'){
          Swal.fire({
            icon: 'error',
            title: 'Lobby Stopped By Pro',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // this.router.navigate(['/lobby-listing-subscriber'])
            // this.router.navigate([`/pro/enterlobby/${lobby}`])
          })
        } 
        if(res.data == 'exist'){
          Swal.fire({
            icon: 'success',
            title: 'Already Joined in this lobby',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // this.router.navigate(['/lobby-listing-subscriber'])
            this.router.navigate([`/pro/enterlobby/${lobby}`])
          })
        } 
        if(res.data == 'joined'){
          Swal.fire({
            icon: 'success',
            title: 'Joined',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // this.router.navigate(['/lobby-listing-subscriber'])
            this.router.navigate([`/pro/enterlobby/${lobby}`])
          })
        } 
        if(res.data == 'Lobby Full'){
          Swal.fire({
            icon: 'error',
            title: 'Lobby Full, Cannot Join Right Now',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/lobby-listing-subscriber'])
          })
        } 
      })
    
  }

}
