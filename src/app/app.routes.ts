import { VideoPlayerComponent } from './video-player/video-player.component';
import { SessionComponent } from './session/session.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ConnectComponent } from './connect';
import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: 'connect', component: ConnectComponent },
  {
    path: 'lobby', component: LobbyComponent,
  },
  {
    path: 'session/:id', component: SessionComponent,
    children: [
      {
        path: 'direct', component: VideoPlayerComponent
      }
    ]
  },
  { path: '**', redirectTo: '/connect' }
];
