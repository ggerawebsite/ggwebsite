import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartyModel } from 'src/app/common/interface/party.interface';
import { HeroService } from 'src/app/hero.service';
import { tap } from 'rxjs'
import { UserDetailedModel } from 'src/app/common/interface/user.interface';
declare const Twitch: any;


@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss']
})
export class TwitchComponent implements OnInit {
  user: UserDetailedModel;
  constructor(private activatedRoute: ActivatedRoute, private heroService: HeroService) { }
  ngOnInit() {
    const partyId = this.activatedRoute.snapshot.paramMap.get("partyId");
    this.heroService.getChannelFromParty(partyId).pipe(
      tap(e => {
        this.user = e.data;
        const TwitchID = e.data.channel_name;// localStorage.getItem('twitch')
        console.log('Twitch' ,TwitchID)
        var options = {
          width: 854,
          height: 480,
          channel: TwitchID,
          // video: "<video ID>",
          // collection: "<collection ID>",
        };
        var player = new Twitch.Player("twichTest", options);
        player.setVolume(0.5);
      })
    ).subscribe();

  }

}
