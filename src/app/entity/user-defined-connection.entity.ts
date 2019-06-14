import {CreateDateColumn, Entity, UpdateDateColumn, VersionColumn} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import {Column} from 'typeorm/decorator/columns/Column';
import {ConnectionType} from '../type/connection-type';
import {PrimaryColumn} from 'typeorm/decorator/columns/PrimaryColumn';

@Entity({name: 'user_defined_connection'})
export class UserDefinedConnection {

  @PrimaryGeneratedColumn()
  @PrimaryColumn({name: 'id'})
  id: number;

  @CreateDateColumn({name: 'create_date'})
  createDate: Date;

  @UpdateDateColumn({name: 'update_date'})
  updateDate: Date;

  @Column({name: 'type', nullable: false})
  type: ConnectionType;

  @Column({name: 'name', nullable: false, unique: true})
  name: string;

  @Column({name: 'database', nullable: false})
  database: string;

  @Column({name: 'host', nullable: false})
  host: string;

  @Column({name: 'port', nullable: false})
  port: number;

  @Column({name: 'username', nullable: false})
  username: string;

  @Column({name: 'password', nullable: false})
  password: string;

  @VersionColumn()
  version: number;
}
