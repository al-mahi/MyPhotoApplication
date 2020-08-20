import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Photo} from '../Photo'
import { AlbumService } from '../album.service';
import { Album } from '../Album';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  albumId: string;
  photos: Photo[];
  currentAlbum: Album;

  constructor(private route: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(
      param => {
        this.albumId = param.get('albumId');
        console.log("Got albumId: ", this.albumId);

        this.albumService.getPhotos(this.albumId).subscribe(
          photos => {
            this.photos = <Photo[]>photos;
            console.log("Got photos for albumId " + this.albumId)
            this.photos.forEach(
              photo => console.log(photo)
            )
          }
        )
        this.getCurrentAlbum()
      }
    )
  }

  getCurrentAlbum(){
    this.albumService.getAllAlbums().subscribe(
      albums=> (<Album[]>albums).forEach(
        album => {
          if((<Album>album).id===this.albumId) {
            this.currentAlbum = <Album>album
            console.log("Current album is: ", album);
          }
        }
      )
    )
  }
}
