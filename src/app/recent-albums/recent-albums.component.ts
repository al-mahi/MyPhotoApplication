import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../Album';

@Component({
  selector: 'app-recent-albums',
  templateUrl: './recent-albums.component.html',
  styleUrls: ['./recent-albums.component.css']
})
export class RecentAlbumsComponent implements OnInit {

  albums: Album[];
  
  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    console.log("Calling album sevice from recent-album component");
    
    this.albumService.getAllAlbums().subscribe(
        response => { 
          this.albums = <Album[]>response;
          console.log("Got all album response ", this.albums);          
        }
    )
  }

}
