import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from "@angular/router";
import { _HttpClient } from '@delon/theme';
import { UboxService } from "app/routes/ubox/ubox.service"
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-ubox-detail',
  templateUrl: './ubox-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UboxDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  loading = false;
  form: FormGroup;
  submitting = false;
  data:any = null;

  constructor(private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private http: _HttpClient,
    private route: ActivatedRoute,
    private service : UboxService,
    ) {}


  ngOnInit(): void {
    this.service.onInit(this.http, this.route);
    this.setDefaultForm();
  }

  ngAfterViewInit(): void {
    //获取id的路由参数, 而不是get参数
    //this.route.paramMap.subscribe(params => {
    this.route.queryParamMap.subscribe(params => {
      let op = params.get("op");
      //edit
      let action = 1;
      if (op == null || op == "0")action = 0; //edit

      if(action == 0){
        this.getData();
      }
    });
  }

  getData() {
    this.loading = true;
    this.service.getDetailFromServer().subscribe(res => {
      this.loading = false;
        this.setForm(res[0]);
        this.cdr.detectChanges();
      });
  }

  setDefaultForm(){
    let res:any = {};
    res.id = "create"
    res.name = "input name";
    res.client = "defaultClient";
    res.openning = "defaultClient";

    res.company = "";
    res.title = "";
    res.depart = "";
    res.mobile = "";
    res.email = "";
    res.im = "";
    res.city = "";

    res.channel = "";
    res.remark = "";
    res.comment = "";
    res.contact_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.setForm(res);
  }

  setForm(res : any){
    this.data = res;
    this.form = this.fb.group({
      nickname: [res.name, [Validators.required]],
      client: [res.client, [Validators.required]],
      openning: [res.openning, [Validators.required]],

      company: [res.company, []],
      title: [res.title, []],
      depart: [res.depart, []],

      mobile: [res.mobile, []],
      phone: [res.phone, []],
      email: [res.email, []],
      im: [res.im, []],

      city: [res.city, []],
      channel: [res.channel, []],
      remark: [res.remark, []],
      comment: [res.comment, []],
      date: [res.contact_date, []],
    });
  }

  clickNow(){
    this.data.contact_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.cdr.detectChanges();
  }

  back(){
    window.history.back();
  }

  submit() {
    this.submitting = true;

    this.loading = true;
    this.service.createOrEditUser(this.data).subscribe(res => {
        this.submitting = false;
        this.loading = false;
        this.msg.success(res.content);

        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(){
    this.service.onDestroy();
  }
}
