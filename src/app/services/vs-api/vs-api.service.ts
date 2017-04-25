import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { connect } from 'tls';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Actions, VSSocketConnection, IVSSocketConnection } from './vs-socket';

export abstract class VSApi {
  public static readonly ConnectRoute = ['connect'];

  protected _connection: IVSSocketConnection;

  constructor(protected _router: Router) {}

  public connect(name: string): Observable<IVSSocketConnection> {
    return this._connect(name).do(_ => this._connection = _);
  }

  public withConnection(callback: (connection: IVSSocketConnection) => void) {
    this._connection
      ? callback(this._connection)
      : this._router.navigate(VSApi.ConnectRoute);
  }

  protected abstract _connect(name: string): Observable<IVSSocketConnection>;
}

@Injectable()
export class VSApiService extends VSApi {
  public static readonly Host = window.location.host;
  public static readonly ApiPath = 'api/v1.0/';
  public static readonly SocketPath = 'connection/';

  constructor(router: Router, private http: Http) {
    super(router);
  }

  public _connect(name: string): Observable<IVSSocketConnection> {
    return VSSocketConnection
      .init(`ws://${VSApiService.Host}/${VSApiService.SocketPath}`, name);
  }
}
