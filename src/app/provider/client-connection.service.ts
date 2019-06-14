import {Injectable} from '@angular/core';
import {remote} from 'electron';
import {Connection, ConnectionOptions} from 'typeorm';
import {from, Observable, Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AppConnection, ConnectionStatus} from '../common/type';
import {UserDefinedConnection} from '../entity/user-defined-connection.entity';

@Injectable()
export class ClientConnectionService {

  private readonly _typeorm = remote.getGlobal('typeorm');
  private readonly _connection: AppConnection = remote.getGlobal('clientConnection');

  constructor() {
  }

  get connection(): AppConnection {
    return this._connection;
  }

  public createConnection(options: ConnectionOptions): Observable<Connection> {
    let conn: Promise<Connection> = this._typeorm.createConnection(options);
    return from(conn);
  }

  public testConnection(options: ConnectionOptions): Subject<ConnectionStatus> {
    let conn: Connection;
    let status = new Subject<ConnectionStatus>();
    this.createConnection(options)
      .pipe(finalize(() => {
        if (conn && conn.isConnected) {
          conn.close()
            .catch(error => {
              throw Error(error);
            });
        }
      }))
      .subscribe(connection => {
        conn = connection;
        Object.freeze(conn);
        conn
          .query('SELECT 1 AS TEST_CONNECTION')
          .then(result => {
            status.next({status: 'SUCCESS', message: 'Success'} as ConnectionStatus);
          })
          .catch(error => {
            status.next({status: 'EXCEPTION', message: `An exception occur! ${error.message}`} as ConnectionStatus);
          });
      }, error => {
        status.next({status: 'EXCEPTION', message: `An exception occur! ${error.message}`} as ConnectionStatus);
      });
    return status;
  }

  public findAll(): Observable<UserDefinedConnection[]> {
    return from(
      this.connection
        .repo.userDefinedConnectionRepository
        .query('select * from user_defined_connection')
    ) as Observable<UserDefinedConnection[]>;
  }

  public save(newConnection: any): Observable<UserDefinedConnection> {
    return from(this.connection
      .repo.userDefinedConnectionRepository
      .save(newConnection)
      .then(connection => {
        return connection;
      })
    ) as Observable<UserDefinedConnection>;
  }
}
