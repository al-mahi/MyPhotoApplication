import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../Photo';
import { TitleCasePipe } from '@angular/common';
import { AlbumService } from '../album.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photoId: string;
  photo: Photo;
  allComments: Comment[];
  newComment: string;
  constructor(private route: ActivatedRoute, private photoService: PhotoService, private albumSerice: AlbumService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(  
      param => {
        this.photoId = param.get('photoId');
        console.log("Got photoId: ", this.photoId);
        this.loadPhoto(this.photoId);
        this.loadComments(this.photoId);
      }
    )
  }

  loadPhoto(photoId: string){
    this.photoService.getPhoto(photoId).subscribe(
      photo => {
        this.photo = <Photo> photo
        console.log("loaded photo: ", this.photo);
        
      }
    )
  }

  loadComments(photoId: string){
    this.photoService.getComments(photoId).subscribe(
      comments=>{
        this.allComments = (<Comment[]> comments).reverse();
        console.log("loaded comments: ", this.allComments);
      }
    )
  }

  saveComment(){
    this.photoService.saveComment(this.photoId, this.newComment).subscribe(
      commentResponse=>{
        console.log("Comment", commentResponse);
        this.loadComments(this.photoId);
        this.newComment="";
        
      }
    )
  }

  toggleCommentOrder(){
    this.allComments = this.allComments.reverse();
    // this.loadComments(this.photoId);
  }

  makeProfilePhoto(){
    this.photoService.makeProfilePhoto(this.photo.photoUrl).subscribe(
      response=>{
        console.log("Profile photo updated")
      }
    )
  }

  makeCoverPhoto(){
    console.log("Calling makeCoverPhoto coverPhotoId: ", this.photo.photoUrl, " albumId: ", this.photo.albumId);
    
    this.albumSerice.makeCoverPhoto(this.photo.photoUrl, this.photo.albumId).subscribe(
      response=>{
        console.log("Cover photo updated", (<HttpResponse<string>>response))
      }
    )
  }

}
