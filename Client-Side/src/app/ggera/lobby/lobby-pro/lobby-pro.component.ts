import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { auditTime, interval, map, Subscription } from 'rxjs';
import { HeroService } from 'src/app/hero.service';
import { LobbyService } from 'src/app/services/lobby.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import Swal from 'sweetalert2';
import { Socket } from "ngx-socket-io";

@Component({
  selector: 'app-lobby-pro',
  templateUrl: './lobby-pro.component.html',
  styleUrls: ['./lobby-pro.component.scss']
})
export class LobbyProComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute, 
    private _lobby: LobbyService,
    private _hero: HeroService,
    private fb: FormBuilder,
    private router: Router,
    private websocketService: WebsocketService,
    private socket: Socket
    ) {
     }

  matchId= "";
  lobby: any;
  users: any;
  user: any;

  title = 'socketrv';
  content = '';
  received = [];
  sent = [];
  data: any = [];

  mySub: Subscription;

  DescForm: any = new FormGroup({
    'matchId': new FormControl(''),
    'desc': new FormControl(''),
    'link': new FormControl(''),
  })

  chatForm: any = new FormGroup({
    'chat': new FormControl(''),
  })

  ngOnInit(): void {
    this.matchId = this.activeRoute.snapshot.paramMap.get("matchId");
    this.getLobby();
    this.getAllUsers();
    this.userData()
    setTimeout(() => {
      this.websocketService.joinRoom(this.matchId)
      this.fetchChat()
  }, 5000);
    
  }
  
  getLobby(){
    this._lobby.getLobbyWithMatchId(this.matchId)
      .subscribe(res => {
        this.lobby = res.data
        console.log(this.lobby)
        this.DescForm = this.fb.group({
          'desc': this.lobby.lobbyDescription,
          'link': this.lobby.invite_link,
          'matchId': this.lobby.matchId
        })
      })
  }
  getAllUsers(){
    console.log("hii");
    this._hero.getAllUsers()
    .subscribe(res => {
      this.users = res.data
      console.log(this.users)
    })
  }

  userData() {
    if (this._hero.getEmail()) {
      let email = this._hero.getEmail()
      this._hero.getUserDetail(email).
        subscribe(res => {
          this.user = res
        })
    }
  }
  editDesc(){
    this._lobby.editDescAndLink(this.DescForm.value)
      .subscribe(res => {
        // this.lobby = res.data
        console.log(res.data)
        Swal.fire({
          icon: 'success',
          title: 'Updated successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();

        })
      })
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  sendMsg() {
    let message = {
      source: '',
      content: ''
    };
    message.source = 'localhost';
    message.content = this.content;

    this.sent.push(message);
    this.websocketService.messages.next(message);
  }
  sendChat(){
    this.websocketService.sendChat(this.matchId, this.user._id, this.user.username, this.chatForm.value.chat)
    this.fetchChat()
    this.chatForm.reset();
  }

  fetchChat(){
    // console.log("Fetching Chat");
    // const data = this.websocketService.fetchChat();
    // console.log(data);

    return (
      this.socket
        .fromEvent("new-message")
        // .pipe(auditTime(1000))
        .subscribe(res => {
          if(!this.data.includes(res)){
            this.data.push(res);
          }
          console.log(this.data);
          console.log("=========");
        })
    );

    // this.socket.fromEvent('new-message').subscribe(res => console.log(res));
    // return this.socket.fromEvent('new-message').pipe(map((data) => console.log(data)));
    // console.log(this.data)
  }
  
  changeLobbyStatus(){
    if(this.user.gamerID == this.lobby.createdBy){
      if(this.lobby.status =="Started"){
        console.log("stop party")
      }
      console.log("hii");
      console.log(this.lobby.status);
      this._lobby.changeLobbyStatus(this.lobby._id)
      .subscribe(res => {
        // this.lobby = res.data
        console.log(res.data)
        Swal.fire({
          icon: 'success',
          title: 'Lobby Stopped Successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.lobby.status= res.data.status
          if(res.data.status =="Stopped"){
            window.location.reload();
          }

        })
      })
    }
  }
  submitTimings(data){
    console.log(data);
    this._lobby.addUserTimings(this.lobby, data)
      .subscribe(res => {
        // this.lobby = res.data
        console.log(res.data)
        this.changeLobbyStatus()
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Updated successfully',
        //   showConfirmButton: false,
        //   timer: 1500
        // }).then(() => {
        //   // window.location.reload();
        //   this.lobby.status= res.data.status

        // })
      })
  }
}
