import { VgBufferingModule } from 'videogular2/buffering';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgControlsModule } from 'videogular2/controls';
import { VgCoreModule } from 'videogular2/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectionBackend, HttpModule } from '@angular/http';

import { AppRoutes } from './app.routes';
import { selectByEnv } from './utils';

import { VSApi, MockVSApiService, VSApiService } from './services/vs-api';
import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { LobbyComponent } from './lobby/lobby.component';
import { SessionComponent } from './session/session.component';
import { VideoPlayerComponent } from './video-player/video-player.component';


@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    LobbyComponent,
    SessionComponent,
    VideoPlayerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [{
    provide: VSApi,
    useClass: selectByEnv(VSApiService, MockVSApiService)
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
