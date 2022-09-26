import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PartyModel } from 'src/app/common/interface/party.interface';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  constructor(private _heroService: HeroService) { }

  parties$: Observable<PartyModel[]>;
  dateFilter="all";

  ngOnInit(): void {
    this.listingParties();
  }
  async listingParties(){
    this.parties$ = this._heroService.getAllParty();
  }

  onDateFilterChange(){
    const query="date="+this.dateFilter;
    this.parties$ = this._heroService.getAllPartyWithQuery(query);
  }
}
