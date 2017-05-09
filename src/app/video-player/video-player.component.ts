import { Observable, Subject } from 'rxjs/Rx';
import { IPlayer, IPlayerController, IPlayerEvent, PlayerAction, setUpPlayerController } from '../utils/player';
import { VgPlayPause } from 'videogular2/src/controls/vg-play-pause/vg-play-pause';
import { VgAPI } from 'videogular2/core';
import { VSApi } from '../services/vs-api/vs-api.service';
import {Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'vs-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
  constructor(private _api: VSApi) { }

  private setupPlayer(api: VgAPI) {
    this._api.withConnection(_ => setUpPlayerController(new VgPlayerController(api), _));
  }
}

// PlayerContrller implementation for direct video player
class VgPlayerController implements IPlayerController {
  public readonly player: IPlayer;
  public readonly actions: Observable<IPlayerEvent>;
  constructor(private vgApi: VgAPI & any) {
    // Dark magic over here

    // Video Player api setup
    this.player = <IPlayer> {
      play: vgApi.play.bind(vgApi),
      pause: vgApi.pause.bind(vgApi)
    };

    // Playback Api override
    const subject = new Subject<IPlayerEvent>();
    vgApi.play = () => { subject.next(<IPlayerEvent>{ action: PlayerAction.Play }); };
    vgApi.pause = () => { subject.next(<IPlayerEvent>{ action: PlayerAction.Pause }); };
    vgApi.seekTime = (time: number, byPercent = false) => { };
    vgApi._playbackRate = vgApi.playbackRate;
    Object.defineProperty(vgApi, 'playbackRate', {
      get() {
        return this._playbackRate;
      },
      set(value) {}
    });
    this.actions = subject;
  }
}
