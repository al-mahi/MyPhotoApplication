import { Component } from '@angular/core';
import { UserService } from './user.service';
import {MessageService} from './message.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyPhotoApplication';

  constructor(public userService: UserService, public messageService: MessageService){}

  logout(){
    console.log("Loggin out app component");
    this.userService.logout();
  }

  clearMessage(){
    this.messageService.clearMessage();
  }
}
