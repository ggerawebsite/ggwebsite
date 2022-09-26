import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WalletModel } from '../common/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  // server_address: string = "http://localhost:8887/api"
  server_address: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  addMoney(amount: any,userId: any) {
    return this.http.post<any>(`${this.server_address}/wallet/add/money`, { userId: userId, amount: amount });
  }
  addMoneyToPro(amount: any,userId: any, desc: string) {
    return this.http.post<any>(`${this.server_address}/wallet/add/money/pro`, { userId: userId, amount: amount, desc: desc});
  }
  
  addMoneyToAdmin(amount: any, partyData: any, desc: any) {
    return this.http.post<any>(`${this.server_address}/wallet/add/money/admin`, { partyData: partyData, amount: amount, desc: desc });
  }

  addMoneyWithStripe(data:any){
    return this.http.post<any>(`${this.server_address}/stripe/addtowallet`,{data});
  }
  
  getUserWalletData(userId: string) {
    console.log(userId);
    return this.http.post<WalletModel>(`${this.server_address}/wallet/details`, { userId: userId });
  }
  getUserWalletTransactionsData(userId: any) {
    console.log(userId);
    return this.http.post<any>(`${this.server_address}/wallet/transactions/details`, { userId: userId });
  }
  reduceMoney( userId:any, amount:any, type: any, desc: string){
    return this.http.post<any>(`${this.server_address}/wallet/reduce/money`, { userId: userId, amount: amount, type: type, desc: desc }); 
  }
  getBalanceWithUserId( userId:any){
    return this.http.get<any>(`${this.server_address}/wallet/balance/${userId}`); 
  }
  getAllTransactions(){
    return this.http.get<any>(`${this.server_address}/wallet/transactions/all`); 
  }
  getAllTransactionsWithUserType(data:any){
    // console.log(`${this.server_address}/wallet/transactions/query?${data}`);
    return this.http.get<any>(`${this.server_address}/wallet/transactions/query?${data}`); 
  }
}
