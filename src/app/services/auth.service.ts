import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router, private _http: HttpClient) { }


  //register
  register(user){    console.log("I am auth service.");
    return this._http.post('/register', user);
    //localStorage.setItem('user',user);
  }

  //login
  login(user){ //console.log("auth service login :"+ user)
    return this._http.post('/login', user);
    //localStorage.setItem('user',user);
  }

  //logout
  logout(){
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  isAuthenticated(){
    console.log(localStorage.getItem('user'))
    return localStorage.getItem('user');
  }
}
