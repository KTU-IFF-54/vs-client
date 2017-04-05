import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPageComponent } from './view-page/view-page.component';

@NgModule({
  imports: [
    CommonModule,
    //RouterModule.forChild(AppRoutes)
    NgbModule,
  ],
  declarations: [ViewPageComponent]
})
export class ViewModule { }
