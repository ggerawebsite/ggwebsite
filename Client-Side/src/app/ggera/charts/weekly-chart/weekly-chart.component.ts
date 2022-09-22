import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-weekly-chart',
  templateUrl: './weekly-chart.component.html',
  styleUrls: ['./weekly-chart.component.scss']
})
export class WeeklyChartComponent implements OnInit {

  public barChartLegend = true;
  public barChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [{
      data: [10, 90, 60, 40],
    }],
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
}
