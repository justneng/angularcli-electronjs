import {Injectable} from '@angular/core';
import {remote} from 'electron';

@Injectable()
export class DatabaseConnectionService {

  private _connection = remote.getGlobal('dataSource');

  constructor() {
  }

  get connection() {
    return this._connection;
  }
}
