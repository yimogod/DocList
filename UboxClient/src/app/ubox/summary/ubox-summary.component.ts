import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { XlsxService, STComponent, STColumn, STData, STChange, STPage } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import { UboxService } from "app/routes/ubox/ubox.service"
import { UboxSummaryDrawerComponent } from "./ubox-summary-drawer.component";

@Component({
  selector: 'app-ubox-summary',
  templateUrl: './ubox-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UboxSummaryComponent implements OnInit {
  q: any = {
    name: "",
    client: "",
    company: "",
    contactDate: null,
  };


  clients:any[] = [];
  companys:any[] = [];

  status = null;
  allData: any[] = [];
  data: any[] = [];
  loading = false;

  page: STPage = {
    //total: '',//分页显示多少条数据，字符串型
    show: true,//显示分页
    showSize: true,
    pageSizes: [20, 40, 80],
  };

  //配置列信息
  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    {
      title: 'Name',
      index: 'name',
      type: 'link',
      click: (item:any) => 'ubox/detail/' + item._id + "?op=0",
    },

    { title: 'Client', index: 'client' },
    { title: 'Openning', index: 'openning' },
    { title: 'Title', index: 'title' },
    { title: 'Company', index: 'company' },
    { title: 'Mobile', index: 'mobile' },
    { title: 'IM', index: 'im' },
    { title: 'ContactDate', index: 'contact_date' },
    { title: 'Remark', index: 'remark' },
    { title: 'Comment', index: 'comment' },
    {
      title: 'Actions',
      width: '50px',
      buttons: [
        {
          text: 'View',
          type: 'drawer',
          drawer: {
            title: "Detail",
            component: UboxSummaryDrawerComponent,
          },
          click: (_record) => {},
        },
        {
          text: 'Delete',
          type: 'del',
          click: (item: any) => this.deleteItem(item._id),
        },
      ],
    },
  ];
  selectedRows: STData[] = [];
  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private service : UboxService,
    private message: NzMessageService,
    private router: Router,
    private xlsx: XlsxService
  ) {}

  ngOnInit() {
    this.service.onInit(this.http, null);
    this.getData();
  }

  getData() {
    this.loading = true;
    let companyDict:Map<string, boolean> = new Map<string,boolean>();
    companyDict.set("All", true)
    let clientDict:Map<string, boolean> = new Map<string,boolean>();
    clientDict.set("All", true)

    this.service.getSummaryFromServer()
      .pipe(
        map((list: any[]) =>{
          if(list == null)return [];
          var li = list.map(i => {
            companyDict.set(i.company, true);
            clientDict.set(i.client, true);
            return i;
          });
          return li;
        }))
        .subscribe(res => {
        this.loading = false;

        this.clients = Array.from(clientDict.keys());
        this.companys = Array.from(companyDict.keys());

        this.allData = res;
        this.data = res;
        this.cdr.detectChanges();
      });
  }

  deleteItem(id:string) {
    this.loading = true;
    this.service.deleteUser(id).subscribe(res =>{
      this.loading = false;
      if (res.status == "500"){
        this.message.info("服务器错误 " + res.content);
      }else if (res.status == "200"){
        this.data = this.data.filter(i=>{
          return i._id != id;
        });

        this.allData = this.allData.filter(i=>{
          return i._id != id;
        });
      }

      this.cdr.detectChanges();
    });
  }

  filterData(){
    this.loading = true;
    this.data = [];
    this.data = this.allData.filter(i=>{
      let n:string = this.q.name;
      if(n !== "" && i.name.indexOf(n) === -1)return false;

      let cl:string = this.q.client;
      if(cl !== "" && cl !== "All" && i.client.indexOf(cl) === -1)return false;

      let co:string = this.q.company;
      if(co !== "" && co !== "All" && i.company.indexOf(co) === -1)return false;

      return true;
    });

    setTimeout(()=> {
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  //下载excel
  download() {
    let title:any = ["name", "client", "openning", "company", "depart", "title",
    "mobile", "phone", "email", "im", "city", "channel", "contact_date", "remark", "comment"];
    let result:any = [];
    result.push(title);

    this.data.forEach(i => result.push(title.map(c => i[c])));
    this.xlsx.export({
      sheets: [
        {
          data: result,
          name: 'Sheet1',
        },
      ],
      filename:"frances_export.xlsx",
    });
  }


  stChange(e: STChange) {
    switch (e.type) {
      case 'checkbox':
        this.selectedRows = e.checkbox!;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  add() {
    this.router.navigateByUrl('/ubox/detail/create?op=1');
  }

  reset() {
    this.q.name = "";
    this.q.client = "";
    this.q.company = "";
    this.q.contactDate = null;
    this.data = this.allData;
    this.cdr.detectChanges();
  }

  searchDuplicate(){
    this.loading = true;

    let dict : any = {}
    this.allData.forEach(e =>{
      console.log(e.name)
      if(dict[e.name] == null)dict[e.name] = 1;
      else dict[e.name]++
    });



    this.data = [];
    this.data = this.allData.filter(e=>{
      if(e.name == "")return false;
      if(dict[e.name] == 1 ) return false;
      return true;
    });

    this.loading = false;
    this.cdr.detectChanges();
  }

  openExcelBak() {
    window.open("http://ubox.iyimo.net:8080/bak", "_blank");
  }

  openExcelUpload() {
    window.open("http://ubox.iyimo.net:8080/upload", "_blank");
  }
}
