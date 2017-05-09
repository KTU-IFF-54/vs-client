import { VSApi } from '../services/vs-api';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'vs-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent {

  @Input()
  private username = '';

  constructor(
    private _router: Router,
    private _api: VSApi
  ) { }

  private connect() {
    // TODO loding animation here
    console.log('conneting...');
    this._api.connect(this.username).subscribe(_ => {
      console.log(`connetced as ${_.name} with id: ${_.id}.`)
      this._router.navigate(['lobby']);
    });
  }
}
