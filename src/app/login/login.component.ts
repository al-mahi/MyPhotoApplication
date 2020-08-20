import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  SignInFormVisible = false; // strange naming behavior SignInFormVisible

  name: string;
  email: string;
  password: string;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  makeSignInFormVisible()
  {
    this.SignInFormVisible = true;
  }

  makeSignUpFormVisible()
  {
    this.SignInFormVisible = false;
  }

  signUp() {
    console.log(this.email + " tried sign up")
    this.userService.signup(this.email, this.password, this.name)
    this.name = ""
    this.email = ""
    this.password = ""
  }

  signIn() {
    console.log(this.email + " tried sign in")
    this.userService.login(this.email, this.password)
    this.email = ""
    this.password = ""
  }

  logout() {
    this.userService.logout();
  }
}
