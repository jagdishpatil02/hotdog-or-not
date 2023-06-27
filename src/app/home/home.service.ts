import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl =
    'https://api-inference.huggingface.co/models/hustvl/yolos-tiny';

  constructor(private http: HttpClient) {}

  sendImage(imageFile: File) {
    const fileBlob = imageFile.slice(0, imageFile.size, 'image/jpeg');
    const blob = new Blob([fileBlob], { type: 'image/jpeg' });
    return this.http.post(this.apiUrl, blob);
  }
}
