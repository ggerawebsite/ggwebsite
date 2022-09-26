import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
    catchError,
    filter,
    firstValueFrom,
    forkJoin,
    map,
    Observable,
    of,
    tap,
} from "rxjs";
import {
    UserDetailedModel,
    WalletModel,
} from "src/app/common/interface/user.interface";
import { HeroService } from "src/app/hero.service";
import { StoreService } from "src/app/services/store.service";
import { WalletService } from "src/app/services/wallet.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-account-details",
    templateUrl: "./account-details.component.html",
    styleUrls: ["./account-details.component.scss"],
})
export class AccountDetailsComponent implements OnInit {
    AddMoneyForm: any = new FormGroup({
        amount: new FormControl(""),
        userId: new FormControl(""),
    });
    user$: Observable<UserDetailedModel>;
    data$: Observable<{
        user: UserDetailedModel;
        wallet: WalletModel;
        transactions: any;
    }>;
    withdrawForm: FormGroup;

    constructor(
        private router: Router,
        public hero: HeroService,
        private fb: FormBuilder,
        private walletService: WalletService,
        private store: StoreService
    ) {
        this.withdrawForm = this.fb.group({
            amount: [0, [Validators.required, Validators.min(50)]],
        });
    }

    async ngOnInit(): Promise<void> {
        const user = await firstValueFrom(
            this.store.currentUser$.pipe(filter((e) => !!e))
        );
        const wallet = await firstValueFrom(
            this.store.wallet$.pipe(filter((e) => !!e))
        );
        const userId = user._id;
        this.data$ = forkJoin({
            user: of(user),
            wallet: of(wallet),
            transactions:
                this.walletService.getUserWalletTransactionsData(userId),
        }).pipe(
            tap((e) => {
                console.log(e);
                
            })
        );
    }

    withdrawMoney() {
        if (this.withdrawForm.valid) {
            this.hero
                .withdrawAmount(this.withdrawForm.value.amount)
                .pipe(
                    tap(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Withdraw request created",
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(() => {
                            this.router.navigate(["/account"]);
                        });
                    }),
                    catchError((err) => {
                        console.log("Console ~ err", err);
                        Swal.fire({
                            icon: "error",
                            title: err.error.error,
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(() => {
                            this.router.navigate(["/account"]);
                        });
                        return of(err);
                    })
                )
                .subscribe();
        }
    }

    async moneyAdd() {
        let data = this.AddMoneyForm.value;
        // data.userId = this.store.currentUserId;
        // await this.walletService.addMoney(data.amount, data.userId).subscribe();
        // window.location.reload();
        // console.log(data.amount);
        this.walletService.addMoneyWithStripe(data.amount).subscribe((res) => {
            window.location.href = res.url;
            this.addMoneyToUserBalance(res.url)
        });
    }
    async addMoneyToUserBalance(url){
        let data = this.AddMoneyForm.value;
        data.userId = this.store.currentUserId;
        await this.walletService.addMoney(data.amount, data.userId).subscribe();
        window.location.href = url;
    }
}
