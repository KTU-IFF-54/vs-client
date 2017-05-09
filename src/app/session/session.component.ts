import * as path from 'path';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'vs-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements AfterViewInit {
  private _id = '1';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.params
      .subscribe(_ =>  {
        this._id = _['id'];
      });
  }

  public ngAfterViewInit(): void {
    this._router.navigate(['direct'], {relativeTo: this._route});
  }
}
