import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from "rxjs";
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {User} from './User'
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

// import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{
  user: Observable<firebase.User>;
  defaultProfilePhoto: string = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private http: HttpClient, private messageService: MessageService) {
    this.user = firebaseAuth.authState;

    console.log("User Id Token at construction of the Service", localStorage.getItem('userIdToken'));
    
    this.user.subscribe(
      userInfo => {
        console.log("User info is available!", userInfo);
        this.saveIdToken(userInfo);
      }
    );
  }

  canActivate(): boolean{
    if(this.firebaseAuth.auth.currentUser!=null){
      return true;
    }
    this.router.navigate(['login'])
    return false;
  }

  saveIdToken(firebaseUser: firebase.User){
    firebaseUser.getIdToken().then(
      idTokenValue =>
      { 
        localStorage.setItem('userIdToken', idTokenValue);
        console.log("Id TOken Value: ", localStorage.getItem("userIdToken"));
      }
    )
  }

  signup(email: string, password: string, name: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Sign Up Success!', value);
        this.saveIdToken(value.user);
        this.registerUser(email, name);
        this.router.navigate(['albums/recent'])
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  registerUser(email: string, name: string){
    var user: User = {
      id:"",
      emailAddress: email,
      name: name,
      profilePhotoUrl: this.defaultProfilePhoto
    }

    this.http.post(environment.API_BASE_URL + "users/register", user).subscribe(
      response =>{
        console.log("Registration Success!");
        this.router.navigate(['albums/recent'])
      }
    )
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.saveIdToken(value.user);
        this.router.navigate(['albums/recent'])
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.messageService.newMessage(err.message);
      });
  }

  logout() {
    localStorage.clear()
    this.firebaseAuth
      .auth
      .signOut().then(
        () => {
          console.log('Logged out.');
          this.router.navigate(['login'])  // important to keep it here
        }
      );
  }

  getCurrentUserProfile() {
    var headers = this.getHeader();
    console.log("Calling getCurrentUserProfile service with headers ", headers);
    return this.http.get(environment.API_BASE_URL + "users/me", {headers});
  }

  getHeader(){
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    }
     
    return headers;
  }

}
