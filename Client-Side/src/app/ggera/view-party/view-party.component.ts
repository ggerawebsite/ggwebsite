import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HeroService } from "src/app/hero.service";
import { Observable, tap, filter } from "rxjs";
import { PartyModel } from "src/app/common/interface/party.interface";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
    selector: "app-view-party",
    templateUrl: "./view-party.component.html",
    styleUrls: ["./view-party.component.scss"],
})
export class ViewPartyComponent implements OnInit {
    partyId: string;
    partyDetails$: Observable<PartyModel>;
    frmTimeSpent: FormGroup;
    showForm: boolean = false;
    constructor(
        private activeRoute: ActivatedRoute,
        private heroService: HeroService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        const partyId = this.activeRoute.snapshot.paramMap.get("partyId");
        if (partyId) {
            this.partyId = partyId;
            this.getDetails();
        }
        this.partyDetails$
            .pipe(
                filter((e) => e.status === "stopped"),
                tap((e) => {
                    this.frmTimeSpent = this.fb.group(
                        e.members
                            .filter((u) => u.id !== e.createdBy)
                            .reduce((acc, curr) => {
                                acc[curr.id] = new FormControl(
                                    curr?.timeSpent || "",
                                    {
                                        validators: [
                                            Validators.required,
                                            Validators.pattern(
                                                "^(([01]?[0-9]|2[0-3])h)?[\\s]?([0-5]?[0-9]m)?$"
                                            ),
                                        ],
                                    }
                                );
                                return acc;
                            }, {})
                    );
                    this.showForm = true;
                })
            )
            .subscribe();
    }

    getDetails() {
        this.partyDetails$ = this.heroService.getPartyDetails(this.partyId);
    }

    startParty() {
        this.heroService
            .startParty(this.partyId)
            .pipe(
                tap((e) => {
                    this.getDetails();
                })
            )
            .subscribe();
    }

    stopParty() {
        this.heroService
            .stopParty(this.partyId)
            .pipe(
                tap((e) => {
                    this.getDetails();
                })
            )
            .subscribe();
    }

    saveTimeSpent(e: FormDataEvent) {
        e.preventDefault();
        // console.log(this.frmTimeSpent.valid);
        // Object.keys(this.frmTimeSpent.controls).map((key) => {
        //     console.log(this.frmTimeSpent.controls[key].errors);
        // });
        // console.log(this.frmTimeSpent.value);
        if (this.frmTimeSpent.valid) {
            this.heroService
                .savePartyMemberTime(this.partyId, this.frmTimeSpent.value)
                .pipe(
                    tap(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Saved successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(() => {
                            setTimeout(() => {
                                this.router.navigate(["/join-party"]);
                            }, 1000);
                        });
                    })
                )
                .subscribe();
        }
    }
}
