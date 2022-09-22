import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HeroService } from "src/app/hero.service";
import { Observable } from 'rxjs'
import { PartyModel } from "src/app/common/interface/party.interface";
declare const Twitch: any;

@Component({
    selector: "app-join-party",
    templateUrl: "./join-party.component.html",
    styleUrls: ["./join-party.component.scss"],
})
export class JoinPartyComponent implements OnInit {
    myParties$: Observable<PartyModel[]>;
    constructor(public heroService: HeroService, private _router: Router) {}

    ngOnInit() {
      this.myParties$ = this.heroService.getMyParties();
    }

    twitch(id: string) {
        localStorage.setItem("twitch", id);
        this._router.navigate(["/twitch-player"]);
    }
    newParty() {
        this._router.navigate(["create-party"]);
    }
    getSlotsLeftArray(party: PartyModel) {
      return Array(5 - party.members.length - 1).fill(0).map((x,i)=>i)
    }
}
