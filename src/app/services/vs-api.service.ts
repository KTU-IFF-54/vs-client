import { environment } from '../environment';
import { Observable } from 'rxjs';
import { connect } from 'tls';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { VSSocketConnection } from './vs-socket';

@Injectable()
export class VSApiService {

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
      .init('ws://localhost:5000/connection', name)
      .do(client => {
        this._connection = client;
      });
  }

}
