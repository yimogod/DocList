import { environment } from 'environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root'
})
export class UboxService{
  // api URL 改为使用 environment.ts 中的配置
  // 跟随部署发生变化
  url = environment.api_url


  uboxId = "";
  http: _HttpClient;

  constructor() {
    // Nemesis URL 改为使用 environment.ts 中的配置
    // 如果需要修改，在这里手动 Override
    // this.url = "http://ubox.iyimo.net:8080/"
  }


  onInit(http: _HttpClient, route: any) {
    this.http = http;

    if (route != null){
      //get param id
      route.paramMap.subscribe(params => { this.uboxId = params.get("id"); });
    }
  }

  onDestroy(): void {
    this.uboxId = "";
  }

  getSummaryFromServer() : Observable<any> {
    return this.http.get(this.url + 'api/summary', null, null);
  }
  
  getDetailFromServer() : Observable<any> {
    let q:any = {"status":"0"};
    return this.http.get(this.url + 'api/detail/' + this.uboxId, q, null);
  }

  createOrEditUser(data:any) : Observable<any> {
    let input:any = new FormData();
    for (const key in data) {
        const element = data[key];
        console.log(key, element)
        input.append(key, element);
    }
    return this.http.post(this.url + 'api/edit/' + this.uboxId, input, null, null);
  }

  //删除用户data可能是,分割的字符串
  deleteUser(id:string) : Observable<any> {
    let input:any = new FormData();
    input.append('id', id);
    return this.http.post(this.url + 'api/delete', input, null, null);
  }

  uploadXlsxToServer(file:any, method:any) : Observable<any> {
    //不能填写option，否则boundary会被冲掉
    //const httpOptions = {
    //  headers: new HttpHeaders({'Content-Type': 'multipart/form-data'}),
    //};

    let input:any = new FormData();
    input.append('upload', file);

    if(method == 1){
      return this.http.post(this.url + 'api/upload_override', input, null, null);
    }else{
      return this.http.post(this.url + 'api/upload_update', input, null, null);
    }
  }
}
