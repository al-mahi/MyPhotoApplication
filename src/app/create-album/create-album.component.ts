import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service'
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {

  albumTitle: string

  constructor(private fileService: FileService, private albumService: AlbumService) { }

  ngOnInit(): void {
  }

  createAlbum(file: File){
    console.log("File: ", file);

    this.fileService.uploadFile(file).subscribe(
      fileResponse => {
        var fileId = fileResponse["fileId"];
        this.saveAlbum(fileId);
      }
    )
  }

  saveAlbum(fileId: string){
    this.albumService.saveAlbum(this.albumTitle, fileId);
  }

}
