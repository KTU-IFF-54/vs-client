import { environment } from '../environment';
import { Observable } from 'rxjs/Rx';
import { connect } from 'tls';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { GWSocket } from './gw-socket';

@Injectable()
export class GWApiService {

  public static readonly ApiPath = 'api/v1.0/';
  public static readonly SocketPath = 'socket/';

  constructor(
    private http: Http
  ) { }

  public connect(username: string): Observable<GWSocket> {
    return GWSocket.init(
      environment.host
        + GWApiService.ApiPath
        + GWApiService.SocketPath,
      username);
  }

}
