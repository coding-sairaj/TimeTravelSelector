import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighchartsComponent } from './highcharts/highcharts.component';
import { HighchartsChartModule } from "highcharts-angular";
import { PollDataService } from './services/poll-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HighchartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule
  ],
  providers: [PollDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
