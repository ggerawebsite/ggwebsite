import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-monthly-chart',
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.scss']
})
export class MonthlyChartComponent implements OnInit {

  public barChartLegend = true;
  public barChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [{
      data: [45, 25, 40, 80],
    }],
    labels: ['June', 'July', 'August', 'September']
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

}
