import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { UserDetailedModel, UserModel, WalletModel } from "../common/interface/user.interface";

@Injectable({
    providedIn: "root",
})
export class StoreService {
    private readonly _selectedGame$: BehaviorSubject<string> = new BehaviorSubject(null);
    private readonly _currentUser$: BehaviorSubject<UserDetailedModel> = new BehaviorSubject(null);
    private readonly _walletData$: BehaviorSubject<WalletModel> = new BehaviorSubject(null);

    constructor() {}

    get selectedGame$() {
        return this._selectedGame$.asObservable();
    }

    set selectedGame(v: string) {
        this._selectedGame$.next(v);
    }

    get selectedGame() {
        return this._selectedGame$.getValue()
    }

    get currentUser$() {
        return this._currentUser$.asObservable();
    }

    get currentUserId() {
        return this._currentUser$.getValue()?._id;
    }

    set currentUser(user: UserDetailedModel) {
        this._currentUser$.next(user);
    }

    get wallet$() {
        return this._walletData$.asObservable();
    }

    set wallet(wallet: WalletModel) {
        this._walletData$.next(wallet);
    }
}
