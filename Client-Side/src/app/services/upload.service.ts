import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor( private http: HttpClient) { }

  uploadImageToCloudinary(image): Observable<any> {
    let data =image;
    console.log(data);
    return this.http.post('https://api.cloudinary.com/v1_1/achums007/image/upload',data);
  }
}
