import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private homeService: HomeService) {}

  selectedFile: any;
  selectedFileDataUrl: any;
  hotdog: any;
  nothotdog: any;
  isApiCallInProgress: boolean = false;

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.hotdog = false;
    this.nothotdog = false;
    this.selectedFile = event.target.files[0];
    this.readFile();
  }

  readFile() {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFileDataUrl = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  async uploadImage() {
    this.isApiCallInProgress = true;

    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    this.hotdog = false;
    this.nothotdog = false;

    this.homeService.sendImage(this.selectedFile).subscribe(
      (response: any) => {
        // Process the API response here
        for (const obj of response) {
          if (obj.label === 'hot dog') {
            this.hotdog = true;
            break;
          }

          if (obj.label != 'hot dog') {
            this.nothotdog = true;
            break;
          }
        }
        this.isApiCallInProgress = false;
      },
      (error: any) => {
        // Handle error response
        console.error(error);
        this.isApiCallInProgress = false;
        // Additional error handling code
      }
    );
  }
}
