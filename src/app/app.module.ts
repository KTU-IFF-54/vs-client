import { VSApiService } from './services/vs-api.service';
import { ViewModule } from './+view/view.module';
import { AppRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { ConnectModule } from './+connect/connect.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ConnectModule,
    ViewModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [VSApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
