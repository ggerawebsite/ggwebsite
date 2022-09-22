import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.scss']
})
export class DailyChartComponent implements OnInit {

  public barChartLegend = true;
  public barChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [{
      data: [45, 25, 40, 80,70,50,90],
    }],
    labels: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday']
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

}
