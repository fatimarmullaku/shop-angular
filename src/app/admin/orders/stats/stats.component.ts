import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {StatsService} from './stats.service';
import {ENDPOINTS} from "../../../shared/constants/api.constants";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  title = 'dashboard';
  chart = [];
  topSoldItemsArr = [];
  photoUrl = ENDPOINTS.products.getProductImage;
  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.getStatsData();
  }
  getStatsData() {
    this.statsService.getStats().subscribe((stDataResponse: any) => {
      this.topSoldItemsArr = stDataResponse.topSoldItems;
      console.log('this.topSoldItemsArr: ', this.topSoldItemsArr);
      const chartData = [
        stDataResponse.FIRST_QUARTAL.orders,
        stDataResponse.SECOND_QUARTAL.orders,
        stDataResponse.THIRD_QUARTAL.orders,
        stDataResponse.FOURTH_QUARTAL.orders,
      ];
      let incomeFirst = 0;
      if (stDataResponse.FIRST_QUARTAL.income) {
        incomeFirst = stDataResponse.FIRST_QUARTAL.income;
      }
      let incomeSecond = 0;
      if (stDataResponse.SECOND_QUARTAL.income) {
        incomeSecond = stDataResponse.SECOND_QUARTAL.income;
      }
      let incomeThird = 0;
      if (stDataResponse.THIRD_QUARTAL.income) {
        incomeThird = stDataResponse.THIRD_QUARTAL.income;
      }
      let incomeFourth = 0;
      if (stDataResponse.FOURTH_QUARTAL.income) {
        incomeFourth = stDataResponse.FOURTH_QUARTAL.income;
      }

      const chartDataIncome = [
        incomeFirst,
        incomeSecond,
        incomeThird,
        incomeFourth,
      ];

      this.generateGraphOrder(chartData);
      this.generateGraphOrderIncome(chartDataIncome);
    });
  }
  generateGraphOrder(dtd) {
    this.chart = new Chart('order', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Number of orders for a Quartal'
        },
      },
      data: {
        labels: ['Quartal 1', 'Quartal 2', 'Quartal 3', 'Quartal 4'],
        datasets: [
          {
            type: 'bar',
            label: 'Quartal orders for DataSet',
            data: dtd,
            backgroundColor: 'rgba(200,0,0,0.4)',
            borderColor: 'rgba(255,0,255,0.4)',
            fill: false,
          }]
      }
    });
  }
  generateGraphOrderIncome(dtd) {
    this.chart = new Chart('income', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Amount of income for a Quartal'
        },
      },
      data: {
        labels: ['Quartal 1', 'Quartal 2', 'Quartal 3', 'Quartal 4'],
        datasets: [
          {
            type: 'bar',
            label: 'Quartal income for DataSet',
            data: dtd,
            backgroundColor: 'rgba(59,22,200,0.4)',
            borderColor: 'rgba(34,30,255,0.4)',
            fill: false,
          }]
      }
    });
  }

}
