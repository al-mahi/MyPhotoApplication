import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Comment} from './Comment'
import { Photo } from './Photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  uploadPhoto(albumId: string, fileId: string){
    var photo: Photo = {
      albumId: albumId,
      createdBy: "",
      dateCreated: "",
      fileId: fileId,
      id: "",
      photoUrl: environment.API_BASE_URL + "files/show/" + fileId,
      thumbnailUrl: environment.API_BASE_URL + "files/show/" + fileId,
   }
   var headers = this.getHeader();
   return this.http.post(environment.API_BASE_URL + "photos", photo, {headers});
  }

  makeProfilePhoto(photoUrl: string){
    var headers = this.getHeader();
    var params = new HttpParams().set('photoUrl', photoUrl)
    return this.http.put(environment.API_BASE_URL + "/users/me/profilePhoto", params, {headers})
  }

  getPhoto(photoId: string){
    var headers = this.getHeader();
    return this.http.get(environment.API_BASE_URL + "photos/" + photoId, {headers});
  }

  saveComment(photoId: string, newComment: string){
    var comment: Comment = {
      comment: newComment,
      createdBy: "",
      dateCreated: "",
      id: "",
      photoId: photoId
    }
    var headers = this.getHeader();
    return this.http.post(environment.API_BASE_URL + "photos/comments", comment, {headers})
  }

  getComments(photoId: string){
    var headers = this.getHeader();
    return this.http.get(environment.API_BASE_URL + "photos/" + photoId + "/comments", {headers});
  }

  getHeader(){
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    }
    return headers;
  }
}
