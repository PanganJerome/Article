import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  baseURL = environment.baseURL
  public request(epoint: string, params:string, body: any, method: string): any{
   switch(method){
     case 'post':  
     return this.http.post(this.baseURL + epoint + params, body , {headers : this.header()}
     );
     case 'put':  
     return this.http.put(this.baseURL + epoint + params,body, {headers : this.header()}
     );
     case 'get':  
     return this.http.get(this.baseURL + epoint + params, {headers : this.header()}
     );
     case 'delete':  
     return this.http.delete(this.baseURL + epoint + params, {headers : this.header()}
     );
   } 
  }

  header(){
    let token = sessionStorage.getItem('token')
    let headers
    if (token) {
      headers = new HttpHeaders()
        .set('Authorization',  'Bearer ' + token)
        .set('Accept', 'application/json')
    }
    return headers
  }
   
  
}
