import { IVSSocketMessage, Actions } from './vs-socket-message';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';

export interface IVSSocketData<T> {
  readonly client: VSSocketConnection;
  readonly data: T;
}

export class VSSocketConnection {
  private client: WebSocket;

  private _id: string;
  public readonly name: string;

  private open = new EventEmitter<VSSocketConnection>();
  public message: Observable<IVSSocketData<IVSSocketMessage>>;
  public error: Observable<IVSSocketData<ErrorEvent>>;

  public get id() {
    return this._id;
  }

  public static init(url: string, name: string): Observable<VSSocketConnection> {
    const client = new VSSocketConnection(url, name);
    return client.open;
  }

  constructor(url: string, name: string) {
    this.client = new WebSocket(`${url}?name=${name}`);
    this.name = name;
    this.setup();
  }

  public send(action: string, params?: {[key: string]: any}) {
    this.client.send(JSON.stringify(<IVSSocketMessage> {
      SenderId: this.id,
      SenderName: this.name,
      Action: action,
      Params: params
    }));
  }

  private setup() {
    this.message = Observable.fromEvent<MessageEvent>(this.client, 'message')
      .map((event) => <IVSSocketData<IVSSocketMessage>> {
        client: this,
        data: JSON.parse(event.data)
      });
    this.message.filter(_ => _.data.Action === Actions.Connected)
      .take(1)
      .subscribe(_ => {
        _.client._id = _.data.SenderId;
        this.open.emit(_.client);
      });
    this.error = Observable.fromEvent<ErrorEvent>(this.client, 'error')
      .map(event => <IVSSocketData<ErrorEvent>>{client: this, data: event});
  }
}
