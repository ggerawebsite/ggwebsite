import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatService } from 'src/app/chat.service';

@Component({
  selector: 'app-chatbox-popup',
  templateUrl: './chatbox-popup.component.html',
  styleUrls: ['./chatbox-popup.component.scss']
})
export class ChatboxPopupComponent implements OnInit {

 

  constructor(private chatService: ChatService) {}

  ngOnInit() {
  }





}
