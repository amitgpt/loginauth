import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _router: Router, private _auth: AuthService, private _http: HttpClient) { }


  //register
  getUsers(){ 
    let token;
    if(this._auth.isAuthenticated()){
        const user = JSON.parse(this._auth.isAuthenticated());        
        token = user.token ? user.token : '';
    }   
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization' : token
      })
    }
    
    return this._http.get('/getuser', httpOptions);
    //localStorage.setItem('user',user);
  }

 
}
