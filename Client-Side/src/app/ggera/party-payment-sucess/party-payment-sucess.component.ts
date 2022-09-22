import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HeroService } from "src/app/hero.service";
import { tap } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
    selector: "app-party-payment-sucess",
    templateUrl: "./party-payment-sucess.component.html",
    styleUrls: ["./party-payment-sucess.component.scss"],
})
export class PartyPaymentSucessComponent implements OnInit {
    constructor(
        private heroService: HeroService,
        private activeRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        const partyId = this.activeRoute.snapshot.paramMap.get("partyId");
        if (partyId) {
            this.heroService
                .addUserToParty(partyId)
                .pipe(
                    tap((e) => {
                        console.log(e);
                        this.router.navigate(["twitch-player", partyId]);
                    })
                )
                .subscribe();
        }
    }
}
