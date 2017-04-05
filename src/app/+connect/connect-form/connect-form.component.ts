import { VSApiService } from '../../services/vs-api.service';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'connect-form',
  templateUrl: './connect-form.component.html',
  styleUrls: ['./connect-form.component.scss']
})
export class ConnectFormComponent {

  @Input()
  private username = '';

  constructor(
    private _router: Router,
    private _api: VSApiService
  ) { }

  private connect() {
    // TODO loding animation here
    console.log('conneting...');
    this._api.connect(this.username).subscribe(_ => {
      console.log(`connetced as ${_.name} with id: ${_.id}.`)
      this._router.navigate(['view']);
    });
  }
}
