import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { concatMap, interval, Subscription } from 'rxjs';
import { PollDataService } from "../services/poll-data.service";

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements OnInit, OnDestroy {
  highcharts = Highcharts;
  values: any[] = [];
  chart!: Highcharts.Chart;
  chartOptions!: Highcharts.Options;
  timeInterval!: Subscription;
  constructor(private pollDataService : PollDataService) {
  }
  ngOnInit(): void {
      this.timeInterval = interval(500)
      .pipe(
        concatMap(() => this.pollDataService.poll())
      ).subscribe(x=> {
        const y = x.map(val => {
          return [val.timestamp, val.value]
        });
        this.values.push(...y);
        

        //this.values.push(...y);
        this.chartOptions = {
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            },
            ordinal: false,
            tickInterval: 10 * 1000
          },
          yAxis: {
              title: {
                  text: 'Star count'
              },
              min: 1000,
              max: 100000
          },
          plotOptions: {
            series: {            
              dataGrouping: {
                enabled: false
              }
            }
          },
          boost: {
            enabled: true,
            useGPUTranslations: true,
            seriesThreshold: 1
          },
          series: [
            {
              id: 'stardata',
              boostThreshold: 1,
              type: 'line',
              data: this.values
            }
          ]
          };
      });
  }
  ngOnDestroy(): void {
      this.timeInterval.unsubscribe();
  }
}
