import { IVSSocketMessage, Actions } from './vs-socket-message';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';

export interface IVSSocketData<T> {
  readonly client: IVSSocketConnection;
  readonly data: T;
}

export type Callback<Data> = (data: IVSSocketData<Data>) => void;

export interface IVSSocketConnection {
  readonly id: string;
  readonly name: string;
  message: Observable<IVSSocketData<IVSSocketMessage>>;
  error: Observable<IVSSocketData<ErrorEvent>>;

  send(action: string, params?): void;
  on(actionSelector: (keys: typeof Actions) => string, callback: Callback<IVSSocketMessage>): this;
  onError(callback: Callback<ErrorEvent>): this;
}

export class VSSocketConnection implements IVSSocketConnection {
  public readonly name: string;
  public message: Observable<IVSSocketData<IVSSocketMessage>>;
  public error: Observable<IVSSocketData<ErrorEvent>>;

  private _id: string;
  private client: WebSocket;
  private open = new EventEmitter<IVSSocketConnection>();

  public get id() {
    return this._id;
  }

  public static init(url: string, name: string): Observable<IVSSocketConnection> {
    const client = new VSSocketConnection(url, name);
    return client.open;
  }

  constructor(url: string, name: string) {
    this.client = new WebSocket(`${url}?name=${name}`);
    this.name = name;
    this.setup();
  }

  public send(action: string, params?) {
    this.client.send(JSON.stringify(<IVSSocketMessage> {
      SenderId: this.id,
      SenderName: this.name,
      Action: action,
      Params: params
    }));
  }

  public on(actionSelector: (keys: typeof Actions) => string, callback: Callback<IVSSocketMessage>): this {
      this.message
        .filter(_ => _.data.Action === actionSelector(Actions))
        .subscribe(callback);
      return this;
  }

  public onError(callback: Callback<ErrorEvent>): this {
      throw new Error('Not implemented yet.');
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
        (<VSSocketConnection>_.client)._id = _.data.SenderId;
        this.open.emit(_.client);
      });
    this.error = Observable.fromEvent<ErrorEvent>(this.client, 'error')
      .map(event => <IVSSocketData<ErrorEvent>>{client: this, data: event});
  }
}
