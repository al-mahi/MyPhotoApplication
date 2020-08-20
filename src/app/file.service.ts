import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File){
    var formData = new FormData();
    formData.append("file0", file);

    return this.http.post(environment.API_BASE_URL+"files/upload", formData);
  }
}
