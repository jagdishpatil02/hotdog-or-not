import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  selectedFile: File | null = null;
  selectedFileDataUrl: string = '';
  hotdog: boolean | undefined = undefined;
  isApiCallInProgress: boolean = false;

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    this.hotdog = undefined;
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }

    this.readFile();
  }

  readFile() {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFileDataUrl = reader.result as string;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async uploadImage() {
    this.isApiCallInProgress = true;

    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    this.homeService.sendImage(this.selectedFile).subscribe(
      (response: any) => {
        // Process the API response here
        for (const obj of response) {
          if (obj.label === 'hot dog') {
            this.hotdog = true;
            break;
          }

          if (obj.label != 'hot dog') {
            this.hotdog = false;
            break;
          }
        }
        this.isApiCallInProgress = false;
      },
      (error: Error) => {
        // Handle error response
        console.error(error);
        this.isApiCallInProgress = false;
        // Additional error handling code
      }
    );
  }
}
