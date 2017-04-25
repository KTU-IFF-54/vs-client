import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, IVSSocketConnection, IVSSocketMessage, IVSSocketData, Callback} from './vs-socket';
import { VSApi } from './';

export class VSSocketConnectionMock implements IVSSocketConnection {
    public readonly id = '1';
    public message: Subject<IVSSocketData<IVSSocketMessage>> = new Subject<any>();
    public error: Subject<IVSSocketData<ErrorEvent>> =  new Subject<any>();

    constructor(public name: string) {};
    public send(action: string, params?: any): void {
        this.message.next(<IVSSocketData<IVSSocketMessage>> {
            client: this,
            data: {
                SenderId: this.id,
                SenderName: this.name,
                Action: action,
                Params: params
            }
        });
    }
    public on(actionSelector: (keys: typeof Actions) => string, callback: Callback<IVSSocketMessage>): this {
      this.message
        .filter(_ => _.data.Action === actionSelector(Actions))
        .subscribe(callback);
      return this;
    }
    public onError(callback: Callback<ErrorEvent>): this {
        throw new Error('Method not implemented.');
    }
}

@Injectable()
export class MockVSApiService extends VSApi {
    constructor(router: Router) {
        super(router);
    }
    _connect(name: string): Observable<IVSSocketConnection> {
        return Observable.from([new VSSocketConnectionMock(name)]);
    }
}
