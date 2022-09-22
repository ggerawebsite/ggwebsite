import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
} from "@angular/forms";
import { HeroService } from "../../hero.service";
import { map, noop, Observable, Observer, of, switchMap, tap } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
    selector: "app-create-party",
    templateUrl: "./create-party.component.html",
    styleUrls: ["./create-party.component.scss"],
})
export class CreatePartyComponent implements OnInit {
    partyForm: FormGroup;

    preferredServers = [
        "Asia Pacific",
        "Europe",
        "Korea",
        "Latin America",
        "North America",
        "Brazil",
    ];

    suggestions$: any;
    search?: string;

    constructor(
        private router: Router,
        private _heroService: HeroService,
        private activated: ActivatedRoute,
        private fb: FormBuilder,
        private store: StoreService
    ) {
        const numberRegex = "^[0-9]*$";
        const urlRegex =
            "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";
        this.partyForm = this.fb.group({
            title: ["", [Validators.required, Validators.minLength(3)]],
            url: ["", [Validators.required, Validators.pattern(urlRegex)]],
            price: [null, [Validators.pattern(numberRegex)]],
            lobbyDescription: [""],
            proUserNickname: [""],
            preferredServer: ["", [Validators.required]],
            gameFormat: [""],
            game: [
                this.store.selectedGame,
                [Validators.required],
            ],
        });
        console.log(this.partyControl.url);
    }

    get partyControl() {
        return this.partyForm.controls;
    }

    ngOnInit(): void {
        this.suggestions$ = new Observable(
            (observer: Observer<string | undefined>) => {
                observer.next(this.partyControl.proUserNickname.value);
            }
        ).pipe(
            switchMap((query: string) => {
                if (query) {
                    return this._heroService
                        .searchUsers(this.partyControl.proUserNickname.value)
                        .pipe(
                            tap((d) => console.log(d)),
                            map((data: any) => (data && data.data) || []),
                            tap(
                                () => noop,
                                (err) => {
                                    // in case of http error
                                    console.log(err);
                                }
                            )
                        );
                }
                return of([]);
            })
        );
    }

    createParty() {
        // console.log(this.partyForm.errors)
        if (this.partyForm.valid) {
            this._heroService
                .createParty(this.partyForm.value)
                .pipe(
                    tap((e) => {
                        if (e.error) alert(e.error);
                        else {
                            this.partyForm.reset();
                            this.router.navigate(["join-party"]);
                        }
                    })
                )
                .subscribe();
        }
    }
}
