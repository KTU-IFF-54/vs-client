import { Observable } from 'rxjs';
import { connect } from 'tls';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Actions, VSSocketConnection } from './vs-socket';

@Injectable()
export class VSApiService {
  public static readonly Host = 'darknp.com'; //window.location.host;
  public static readonly ApiPath = 'api/v1.0/';
  public static readonly SocketPath = 'connection/';

  private _connection: VSSocketConnection;
  public get connection() {
    return this._connection;
  }

  constructor(
    private http: Http
  ) { }

  public connect(name: string): Observable<VSSocketConnection> {
    return VSSocketConnection
      .init(`ws://${VSApiService.Host}/${VSApiService.SocketPath}`, name)
      .do(client => {
        this._connection = client;
      });
  }
}


