import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../file.service';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {

  albumId: string;
  // good point ActivatedRoute vs Router routerLinked
  constructor(private route: ActivatedRoute, private router: Router, private fileService: FileService, private photoService: PhotoService) { 
    this.route.paramMap.subscribe(
      param => {
        this.albumId= param.get('albumId');
        console.log("Got albumId: ", this.albumId);
      }
    )
  }

  ngOnInit(): void {
  }

  uploadPhoto(file: File){
    console.log("File: ", file);
    this.fileService.uploadFile(file).subscribe(
      fileResponse => {
        var fileId = fileResponse["fileId"];
        this.photoService.uploadPhoto(this.albumId, fileId).subscribe(
          responseUpload => {
            console.log("Uploaded photo: ", responseUpload);
            this.router.navigate(['album', this.albumId])
          }
        );
      }
    )
  }

}
