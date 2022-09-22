import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PartyModel } from "src/app/common/interface/party.interface";
import { HeroService } from "src/app/hero.service";
import { tap, Subscription, Observable } from "rxjs";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { UserModel } from "src/app/common/interface/user.interface";
import { WalletService } from "src/app/services/wallet.service";
import Swal from 'sweetalert2';

@Component({
    selector: "app-home-page-new1",
    templateUrl: "./home-page-new1.component.html",
    styleUrls: ["./home-page-new1.component.scss"],
})
export class HomePageNew1Component implements OnInit {
    constructor(
      private _heroService: HeroService, 
      private router: Router, 
      private domSanitizer: DomSanitizer,
      private _walletService: WalletService
      ) {}

    paymentHandler: any = null;

    success: boolean = false;

    failure: boolean = false;

    parties$: Observable<PartyModel[]>;

    user: any;

    ngOnInit(): void {
      this.parties$ = this._heroService.getParty();
      this.userData();
    }

    newStripe(data) {
        this._heroService.newStripe(data).subscribe((res) => {
            window.location.href = res.url;
        });
    }
    userData() {
      if (this._heroService.getEmail()) {
        let email = this._heroService.getEmail()
        this._heroService.getUserDetail(email).
          subscribe(res => {
            this.user = res
          })  
      }
    }
    userPayForParty(data) {
      console.log(data);
      console.log(this.user);
      this._walletService.getUserWalletData(this.user._id).
      subscribe(res => {
        this.checkWalletData(res, data)
      })
    }
  
    checkWalletData(res, partyData){
      console.log(res);
      if(res.balance >= partyData.price){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          console.log("Fund available");
          this.reduceFundFromUser(res,partyData)
          // this.router.navigate([`/party/${partyData.partyId}/payment/success`])
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Insufficient funds, please add money to wallet',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          console.log("Insufficient funds, please add money to wallet");
          this.router.navigate(['/account'])

        })
      }
    }
    reduceFundFromUser(walletData, partyData){
      // console.log(walletData, partyData)
        // this.addFundToAdmin(walletData, partyData);
      this._walletService.reduceMoney(walletData.userId, 10).
      subscribe(res => {
        this.addFundToAdmin(walletData, partyData);
        // this.router.navigate([`/party/${partyData.partyId}/payment/success`])
      })
    }

    addFundToAdmin(walletData, partyData){
      console.log("ddd");
      console.log(partyData);
      this._walletService.addMoneyToAdmin(2, partyData).
      subscribe(res => {
        console.log(res.data)
        this.addMoneyToPro(2,partyData)
        // this.router.navigate([`/party/${partyData.partyId}/payment/success`])
      })
    }
    addMoneyToPro(amount, partyData){
      this._walletService.addMoney(amount,partyData.partyCreatedBy  ).
      subscribe(res => {
        console.log(res.data)
        this.router.navigate([`/party/${partyData.partyId}/payment/success`])
      })
    }
    // makePayment(amount: number) {
    //   const paymentHandler = (<any>window).StripeCheckout.configure({
    //     key: 'pk_test_51LT4FJSBGyD7UYjV7Uzl35ECOGv6TAtzwwYlAokpfqWpLNoXEZq1Ov3RoijNAxrN5fRhYqxzedauoF7tyFlbgr9q002zPPPLTa',
    //     locale: 'auto',
    //     token: function (stripeToken: any) {
    //       console.log(stripeToken);
    //       paymentstripe(stripeToken);
    //     },
    //   });

    sanitizeUrl(url) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    }

    getSlotsLeft(party: PartyModel) {
      const members = party.members.filter(e => e.id !== party.createdBy);
      return `${4 - members.length} slots left`
    }

    getSlotsLeftArray(party: PartyModel) {
      return Array(5 - party.members.length).fill(0).map((x,i)=>i)
    }

    //   // const paymentstripe = (stripeToken: any) => {
    //   //   this._heroService.makePayment(stripeToken).subscribe((data: any) => {
    //   //     if (data.data === "success") {
    //   //       console.log('success payment')
    //   //       this.success = true
    //   //       let email = this._heroService.getEmail()
    //   //       this._heroService.addMoney(email, amount)
    //   //         .subscribe(res => {
    //   //           this.router.navigate(['/twitch-player'])
    //   //         })
    //   //     }
    //   //     else {
    //   //       this.failure = true
    //   //     }
    //   //   });
    //   // };

    //   // paymentHandler.open({
    //   //   name: 'ggEra',
    //   //   description: 'Payment',
    //   //   amount: amount * 100,
    //   // });
    // }

    // invokeStripe() {
    //   if (!window.document.getElementById('stripe-script')) {
    //     const script = window.document.createElement('script');
    //     script.id = 'stripe-script';
    //     script.type = 'text/javascript';
    //     script.src = 'https://checkout.stripe.com/checkout.js';
    //     script.onload = () => {
    //       this.paymentHandler = (<any>window).StripeCheckout.configure({
    //         key: 'pk_test_51LT4FJSBGyD7UYjV7Uzl35ECOGv6TAtzwwYlAokpfqWpLNoXEZq1Ov3RoijNAxrN5fRhYqxzedauoF7tyFlbgr9q002zPPPLTa',
    //         locale: 'auto',
    //         token: function (stripeToken: any) {
    //           console.log(stripeToken);
    //         },
    //       });
    //     };

    //     window.document.body.appendChild(script);
    //   }
    // }
}
