import {Connection} from 'typeorm';

export type ConnectionStatus = {
  status: 'SUCCESS' | 'EXCEPTION'
  message: string
}; //status = SUCCESS OR EXCEPTION

export type ConnectionType = 'mysql' | 'postgresql' | 'sqlite';

export type AppConnection = {
  instance: Connection,
  repo: any,
  information: any
}
