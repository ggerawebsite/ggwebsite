import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HeroService } from 'src/app/hero.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  withdrawRequest$: Observable<any>;
  users$:Observable<any>;

  constructor(private wallet: WalletService, private hero: HeroService ) { }

  ngOnInit(): void {
    this.users$=this.hero.getAllUsers()
    .pipe(tap(e=>{
      console.log(e)
    }))
    this.getTransactions();

  }
  getTransactions() {
    this.withdrawRequest$ = this.wallet.getAllTransactions();
  }
}
