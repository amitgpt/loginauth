import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    fullName: "",
    email: "",
    password: ""
  }
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  register(theUser: User){
    //console.log(theUser);
    this._auth.register(theUser).subscribe(data => {
      console.log(data);
    }, (err) => console.log("I am here :" +err));
  }

}
