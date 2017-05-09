import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vs-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor(private _router: Router) { }

  public ngOnInit() {
  }

  public join(id: string) {
    this._router.navigate(['/session', id]);
  }
}
