import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "http://127.0.0.1:8000/"
  // url = "https://data-myexpenses.vercel.app/"

  constructor(
    private http:HttpClient
  ) { }


  postRegisterUsers(data:any): Observable <any> {
    const api = this.url + "api/register";
    return this.http.post(api,data)
  }

  postLoginUsers(data:any): Observable <any> {
    const api = this.url + "api/login";
    return this.http.post(api,data)
  }

  getAccountType(): Observable <any> {
    const api = this.url + "api/get_acc_type";
    return this.http.get(api)
  }

  getAccount(): Observable <any> {
    const api = this.url + "api/get_acc";
    return this.http.get(api)
  }

  postAccountByUser(data:any): Observable <any> {
    const api = this.url + "api/get_acc_by_user";
    return this.http.post(api,data)
  }

  postAddAccount(data:any): Observable <any> {
    const api = this.url + "api/post_add_acc";
    return this.http.post(api,data)
  }

  getRecordCategories(): Observable<any>{
    const api = this.url + "api/get_categories";
    return this.http.get(api)
  }

  postAddRecord(data:any):Observable<any>{
    const api = this.url + "api/post_add_transaction";
    return this.http.post(api,data)
  }

  getRecord(data:any):Observable<any>{
    const api = this.url + "api/get_transaction";
    return this.http.post(api,data)
  }

  postAddSplitAmount(data:any):Observable<any>{
    const api = this.url + "api/post_add_split_amount";
    return this.http.post(api,data)
  }
}
