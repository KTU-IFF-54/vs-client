import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Actions } from '../../services/vs-socket';
import { VSApiService } from '../../services/vs-api.service';
import { AppComponent } from '../../app.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss'],
})

export class ViewPageComponent implements OnInit {
  @ViewChild('video')
  private video: ElementRef;
  private isPlaying: boolean = false;
  private timer: number = 100;

  constructor(private _router: Router, private _api: VSApiService) {
  }

  public ngOnInit() {
    let t = setInterval(_ => {
      this.timer += 2;
      if (this.timer > 1000) {
        clearInterval(t);
      }
      console.log(this.timer);
    }, 10);

    if (!this._api.connection) {
      this._router.navigate(['connect']);
      return;
    }
    this._api.connection.message
      .filter(_ => _.data.Action === Actions.Play)
      .subscribe(_ => {
        this.playVideo();
      });
    this._api.connection.message
      .filter(_ => _.data.Action === Actions.Pause)
      .subscribe(_ => {
        this.pauseVideo();
      });
    this._api.connection.message
      .filter(_ => _.data.Action === Actions.Rewind)
      .subscribe(_ => {
        this.rewindVideo();
      });
  }

  public play() {
    this._api.connection.send(Actions.Play);
  }
  public pause() {
    this._api.connection.send(Actions.Pause);
  }
  public rewind() {
    this._api.connection.send(Actions.Rewind);
  }

  private playVideo(){
    (<HTMLVideoElement>this.video.nativeElement).play();
    this.isPlaying = true;
  }
  private pauseVideo(){
    (<HTMLVideoElement>this.video.nativeElement).pause();
    this.isPlaying = false;
  }
  private rewindVideo(){
    (<HTMLVideoElement>this.video.nativeElement).currentTime = 0;
  }
}
