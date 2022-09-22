import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, tap } from 'rxjs';
import { AdminDashboardUserStatsModel } from 'src/app/common/interface/admin.interface';
import { AdminService } from 'src/app/common/service/admin.service';
import { HeroService } from 'src/app/hero.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats$: Observable<AdminDashboardUserStatsModel> = null;
  proEarning:any=0;
  user: any;
  balance: any;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      // datalabels: {
      //   formatter: (value, ctx) => {
      //     if (ctx.chart.data.labels) {
      //       return ctx.chart.data.labels[ctx.dataIndex];
      //     }
      //   },
      // },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ 'Subscribers', 'Pro Users', 'Pro Requests' ],
    datasets: [ {
      data: [ 0, 0, 0 ]
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [  ];
  constructor(private adminService: AdminService, private hero: HeroService, private wallet: WalletService) { }

  ngOnInit(): void {
    this.stats$ = this.adminService.getDashboardDetails().pipe(tap(e => {
      this.pieChartData.datasets[0] = {data: [e.subscriber, e.proUsers, e.proRequest]}
    }));
    this.adminService.getProEarnings().subscribe(res=>{
      console.log(res)
      this.proEarning=res.data
    })
    this.getUserData();
    
    //console.log(this.proEarning)
  }
  getUserData() {
    if(this.hero.getEmail()){
      let email = this.hero.getEmail()
      this.hero.getUserDetail(email).
        subscribe(res => {
          this.user = res;
          this.getBalance();
        })
    }
  }
  getBalance(){
    console.log(this.user)
    this.wallet.getBalanceWithUserId(this.user._id).
        subscribe(res => {
          this.balance = res;
          console.log(this.balance)
        })
  }
    

}
