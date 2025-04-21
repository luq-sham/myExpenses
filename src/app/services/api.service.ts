import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "http://127.0.0.1:8000/"

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

  postAddAccount(data:any): Observable <any> {
    const api = this.url + "api/post_add_acc";
    return this.http.post(api,data)
  }
}
