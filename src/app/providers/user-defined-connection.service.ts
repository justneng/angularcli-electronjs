import {Injectable, OnInit} from '@angular/core';
import {ipcRenderer, remote} from 'electron';
import {ClientConnectionService} from './client-connection.service';
import {Connection, ConnectionOptions} from 'typeorm';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class UserDefinedConnectionService implements OnInit {

  private _connection = new BehaviorSubject<Connection>(remote.getGlobal('userDefinedConnection'));

  constructor(private clientConnectionService: ClientConnectionService) {
  }

  ngOnInit(): void {
  }

  public createConnection(options: ConnectionOptions) {
    console.log('[Renderer Process] : Hey Main Process I send you a \'connection\'. please store it for me.');
    let response = ipcRenderer.sendSync('synchronous-user-defined-connection', options);
    console.log(response);
    const currentConnection = remote.getGlobal('userDefinedConnection');
    this._connection.next(currentConnection);
  }

  connect(name: string) {
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

  async findUserDefinedDatabaseByName(name: string) {
    return await this.clientConnectionService
      .connection
      .repo.userDefinedConnectionRepository
      .findOne(1);
  }

  get connection(): BehaviorSubject<Connection> {
    return this._connection;
  }
}
