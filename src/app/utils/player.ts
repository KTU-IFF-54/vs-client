import { Actions, IVSSocketConnection } from '../services/vs-api/vs-socket';
import { Observable, Subscription } from 'rxjs/Rx';
export enum PlayerAction {
  Play,
  Pause
}
export interface IPlayerEvent {
  readonly action: PlayerAction;
  readonly params: any;
}
export interface IPlayer {
  play(): void;
  pause(): void;
}
export interface IPlayerController {
  readonly player: IPlayer;
  readonly actions: Observable<IPlayerEvent>;
}
export function setUpPlayerController(controller: IPlayerController, connection: IVSSocketConnection): Subscription {
  return new Subscription()
    .add(controller.actions.subscribe(_ => {
      switch (_.action) {
        case PlayerAction.Play:
          connection.send(Actions.Play);
          break;
        case PlayerAction.Pause:
          connection.send(Actions.Pause);
          break;
      };
    })).add(connection.message.subscribe(_ => {
      switch(_.data.Action) {
        case Actions.Play:
          controller.player.play();
          break;
        case Actions.Pause:
          controller.player.pause();
          break;
      }
    }));
}
