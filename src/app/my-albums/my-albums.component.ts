import { Component, OnInit } from '@angular/core';
import { Album } from '../Album';
import { AlbumService } from '../album.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../User';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent implements OnInit {

  albums: Album[];
  user: User;
    
  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    console.log("Calling album sevice from recent-album component");
    this.albumService.getMyAlbums().subscribe(
        albums => { 
          this.albums = (<Album[]>albums)
          console.log("Got all my albums response ", this.albums);          
        }
    )
  }
}
