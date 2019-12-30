import { Component, AfterViewInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { tap, map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { UboxService } from "app/routes/ubox/ubox.service"
import { UboxFpsChartData } from "./ubox-fps-chart-data"

@Component({
  selector: 'app-ubox-fps',
  templateUrl: './ubox-fps.component.html',
})

export class UboxFPSComponent implements AfterViewInit {
  chartData: UboxFpsChartData;
  loading = true;

  constructor(
    public msg: NzMessageService,
    private service : UboxService,
  ) {}

  ngAfterViewInit() {
    /*this.service.getBaseDataFromServer("fps")
      .pipe(tap(() => (this.loading = false)),
      ).subscribe(res => {
        this.chartData = new UboxFpsChartData();
        this.chartData.ShowChart(res);
      });-*/
  }
}
