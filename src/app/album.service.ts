import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Album } from './Album';
import { map, take, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllAlbums() {
    var headers = this.getHeader();
    console.log("Calling getAllAlbums service with headers ", headers);
    return this.http.get(environment.API_BASE_URL + "albums/all", {headers});
  }

  getMyAlbums() {
    var headers = this.getHeader();
    console.log("Calling getAllAlbums service with headers ", headers);
    return this.http.get(environment.API_BASE_URL + "albums", {headers});
  }

  saveAlbum(albumTitle: string, fileId: string){
   var album: Album = {
      coverPhotoUrl: environment.API_BASE_URL + "files/show/" + fileId,
      createdBy: "",
      creationDate: "",
      id: "",
      title: albumTitle
   }
   console.log("Called AlbumService::saveAlbum fileid: ", fileId);
   var headers = this.getHeader();
   return this.http.post(environment.API_BASE_URL + "albums", album, {headers}).subscribe(
    albumData =>{
      console.log("Album creation Success!");
      var album: Album = <Album>(albumData);
      this.router.navigate(['album', album.id])
    }
   )
  }

  makeCoverPhoto(photoUrl: string, albumId: string) {
    var headers = this.getHeader();
    var params = new HttpParams().set('id', albumId).set('photoUrl', photoUrl);
    return this.http.put(environment.API_BASE_URL + "albums/coverPhoto", params, {headers})
  }


  getPhotos(albumId: string){
    var headers = this.getHeader();
    return this.http.get(environment.API_BASE_URL + "albums/" + albumId + "/photos", {headers});
  }

  getHeader(){
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    }
    
    return headers;
  }

}
