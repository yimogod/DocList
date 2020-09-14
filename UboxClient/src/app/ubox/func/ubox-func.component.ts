import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { XlsxService } from '@delon/abc';
import { UboxService } from "app/routes/ubox/ubox.service"
import { UboxUtil } from "app/routes/ubox/ubox-util"

@Component({
  selector: 'app-ubox-func',
  templateUrl: './ubox-func.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UboxFuncComponent implements OnInit {
  loading = false;
  file:any = null;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private service : UboxService,
    private xlsx: XlsxService
  ) {}

  ngOnInit() {
    this.service.onInit(this.http, null);
  }

  uploadChange(e: Event) {
    this.file = (e.target as HTMLInputElement).files![0];
    console.info(this.file.name);
    //this.xlsx.import(file).then(res => (this.data = res));
  }

  uploadBak(){
    if (this.file == null){
      this.msg.warning("没有选择要上传的文件");
      return;
    }

    this.loading = true;
    
    this.service.uploadXlsxToServer(this.file, 1).subscribe(res=>{
      console.log(res);
      this.loading = false;

      let r:boolean = UboxUtil.HandleResponseStatus(this.msg, res.status)
      if (!r)return;

      this.msg.info("上传成功");
    });
  }
}
