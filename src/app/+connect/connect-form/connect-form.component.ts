import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-connect',
  templateUrl: './connect-form.component.html',
  styleUrls: ['./connect-form.component.scss']
})
export class ConnectFormComponent {

  @Input()
  private username = '';

  constructor(private router: Router) { }

  private connect() {
    this.router.navigate(['view']);
  }
}
