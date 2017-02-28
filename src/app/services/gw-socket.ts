import { Observable } from 'rxjs/Rx';
import { connect } from 'tls';
import { Http } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';

export interface IGWSocketEvent {
  readonly socket: GWSocket;
  readonly event: Event;
}

export class GWSocket {
  private client: WebSocket;
  public open: Observable<Event>;
  public message: Observable<MessageEvent>;
  public error: Observable<ErrorEvent>;
  public static init(url: string, username: string): Observable<GWSocket> {
    let socket = new GWSocket(url);
    return socket.open.map(_ => socket);
  }

  constructor(url: string) {
    this.client = new WebSocket(url);
    this.setup();
  }

  private setup() {
    this.open = Observable.fromEvent(this.client, 'open');
    this.message = Observable.fromEvent(this.client, 'message');
    this.error = Observable.fromEvent(this.client, 'error');
  }


}
