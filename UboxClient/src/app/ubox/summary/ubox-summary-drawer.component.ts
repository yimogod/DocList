import { Component, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: `app-ubox-summary-drawer`,
  template: `
  <nz-card>
    <sv-container>
      <sv-title>{{record.name}}</sv-title>
      <sv label="部门">{{record.depart}}</sv>
      <sv label="客户">{{record.client}}</sv>
      <sv label="Openning">{{record.openning}}</sv>
      <sv label="Title">{{record.title}}</sv>
      <sv label="公司">{{record.company}}</sv>
      <sv label="部门">{{record.depart}}</sv>
      <sv label="手机">{{record.mobile}}</sv>
      <sv label="电话">{{record.phone}}</sv>
      <sv label="邮箱">{{record.email}}</sv>
      <sv label="IM">{{record.im}}</sv>
      <sv label="居住城市">{{record.city}}</sv>
      <sv label="来源">{{record.channel}}</sv>
      <sv label="联系日期">{{record.contact_date}}</sv>
    </sv-container>
  </nz-card>
  <nz-card>
    <sv-container col="1">
      <sv label="标记">{{record.remark}}</sv>
      <sv label="评价">{{record.comment}}</sv>
    </sv-container>
  </nz-card>
    <div class="drawer-footer">
      <button nz-button [nzType]="'default'" (click)="cancel()">
        Close
      </button>
    </div>
  `,
})
export class UboxSummaryDrawerComponent {
  @Input()
  record: any;
  //<sv label="Unit" unit="个"></sv>
  constructor(private ref: NzDrawerRef) {}

  cancel() {
    this.ref.close();
  }
}
