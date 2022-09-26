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
  userType="all";
  dateFilter="all";
  query = "";
  constructor(private wallet: WalletService, private hero: HeroService ) { }

  ngOnInit(): void {
    // this.users$=this.hero.getAllUsers()
    // .pipe(tap(e=>{
    //   console.log(e)
    // }))
    this.filterWithUser();

  }
  // getTransactions() {
  // }
  
  async filterWithUser(){
    this.users$=this.hero.getAllUsers()
    .pipe(tap(e=>{
      console.log(e)
    }))
    console.log(this.userType)
    
    if(this.userType == "all"){
      this.query="";
      // this.withdrawRequest$ = this.wallet.getAllTransactions();
    }
    if(this.userType == "admin"){
      this.query="type=addMoneyToAdminWallet";
      // this.withdrawRequest$ = await this.wallet.getAllTransactionsWithUserType('type=addMoneyToAdminWallet');
    }
    if(this.userType == "pro"){
      this.query="type=addMoneyToProWallet";
      // this.withdrawRequest$ = await this.wallet.getAllTransactionsWithUserType('type=addMoneyToProWallet');
    }
    console.log(this.query)
    this.withdrawRequest$ = await this.wallet.getAllTransactionsWithUserType(this.query);
  }

  async onDateFilterChange(){
    const temp = this.query;
    if(this.dateFilter){
      if(this.query == ""){
        this.query="date="+this.dateFilter;
      }else{
        this.query= this.query+"&date="+this.dateFilter;
      }
    }
    this.withdrawRequest$ = await this.wallet.getAllTransactionsWithUserType(this.query);
    this.query=temp;
  }
}
