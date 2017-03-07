import { AppComponent } from '../../app.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})

export class ViewPageComponent{
  @ViewChild('video')
  private video: ElementRef;
  private isPlaying: boolean = false;

  constructor() { }
 /* ngOnInit() {
  }
*/
  playVideo(){
    (<HTMLVideoElement>this.video.nativeElement).play();
    this.isPlaying = true;
  }
  pauseVideo(){
    (<HTMLVideoElement>this.video.nativeElement).pause();
    this.isPlaying = false;
  }
  rewindVideo(){
    (<HTMLVideoElement>this.video.nativeElement).currentTime = 0;
  }
}
