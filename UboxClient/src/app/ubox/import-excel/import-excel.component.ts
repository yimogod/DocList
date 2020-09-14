import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { XlsxService, STComponent, STColumn, STData, STChange, STPage } from '@delon/abc';
import { UboxService } from "app/routes/ubox/ubox.service"
import { UboxUtil } from "app/routes/ubox/ubox-util"

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportExcelComponent implements OnInit {
  loading = false;
  file:any = null;
  updatedData: any[] = [];
  newData: any[] = [];


  page: STPage = {
    show: true,//显示分页
    showSize: true,
    pageSizes: [100, 200],
  };

  //配置列信息
  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: 'Name', index: 'Name'},
    { title: 'Client', index: 'Client' },
    { title: 'Openning', index: 'Openning' },
    { title: 'Title', index: 'Title' },
    { title: 'Company', index: 'Company' },
    { title: 'Mobile', index: 'Mobile' },
    { title: 'IM', index: 'IM' },
    { title: 'Channel', index: 'Channel' },
    { title: 'ContactDate', index: 'ContactDate' },
  ];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private service : UboxService,
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
    
    this.service.uploadXlsxToServer(this.file, 2).subscribe(res=>{
      console.log(res);
      this.loading = false;

      let r:boolean = UboxUtil.HandleResponseStatus(this.msg, res.status)
      if (!r)return;

      this.msg.info("上传成功");

      if (res.updated == "null")res.updated = []
      if (res.inserted == "null")res.inserted = []
      this.updatedData = res.updated;
      this.newData = res.inserted;
      this.cdr.detectChanges();
    });
  }
}
