import {Injectable, OnInit} from '@angular/core';
import {ipcRenderer, remote} from 'electron';
import {ClientConnectionService} from './client-connection.service';
import {ConnectionOptions} from 'typeorm';
import {BehaviorSubject} from 'rxjs';
import {AppConnection} from '../common/type';

@Injectable()
export class UserDefinedConnectionService implements OnInit {

  private _connection = new BehaviorSubject<AppConnection>(remote.getGlobal('userDefinedConnection'));

  constructor(private clientConnectionService: ClientConnectionService) {
  }

  ngOnInit(): void {
  }

  get connection(): BehaviorSubject<AppConnection> {
    return this._connection;
  }

  public createConnection(options: ConnectionOptions) {
    console.log('[Renderer Process] : Hey Main Process I send you a \'connection\'. please store it for me.');
    let response = ipcRenderer.sendSync('synchronous-user-defined-connection', options);
    console.log(response);
    const currentConnection = remote.getGlobal('userDefinedConnection');
    this._connection.next(currentConnection);
  }

  public connect(name: string) {
    this.findUserDefinedDatabaseByName(name)
      .then(result => {
        let options = {
          name: result.name,
          type: result.type,
          host: result.host,
          port: result.port,
          username: result.username,
          password: result.password,
          database: result.database
        };
        return this.createConnection(options as ConnectionOptions);
      });
  }

  public anyActive(): boolean {
    let current: AppConnection = remote.getGlobal('userDefinedConnection');
    return current && current.instance && current.instance.isConnected;
  }


  public async findUserDefinedDatabaseByName(name: string) {
    return await this.clientConnectionService
      .connection
      .repo.userDefinedConnectionRepository
      .findOne(1);
  }

  public disconnect() {
    let current: AppConnection = remote.getGlobal('userDefinedConnection');
    if (current && current.instance && current.instance.isConnected) {
      current.instance.close()
        .then(result => {
          console.log('disconnect from current connection ', result);
          this._connection.next(undefined);
        })
        .catch(err => {
          throw err;
        })
    }
  }
}
