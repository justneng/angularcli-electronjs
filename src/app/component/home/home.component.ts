import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {ClientConnectionService} from '../../provider/client-connection.service';
import {UserDefinedConnection} from '../../entity/user-defined-connection.entity';
import {UserDefinedConnectionService} from '../../provider/user-defined-connection.service';
import {AppConnection, ConnectionStatus} from '../../common/type';
import {PathService} from '../../provider/path.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  newConnection: any = {};
  connectionStatus: ConnectionStatus;
  userDefinedConnections: UserDefinedConnection[] = [];
  currentUserDefinedConnection: AppConnection;

  constructor(private modalService: NgbModal,
              private clientConnectionService: ClientConnectionService,
              private userDefinedConnectionService: UserDefinedConnectionService,
              public pathService: PathService) {

    this.userDefinedConnectionService
      .connection
      .subscribe(connection => {
        this.currentUserDefinedConnection = connection;
      });
  }

  ngOnInit() {
    this.findAllUserDefinedConnection();
  }

  findAllUserDefinedConnection() {
    this.clientConnectionService
      .findAll()
      .subscribe(result => {
        this.userDefinedConnections = result;
      });
  }

  open(content) {
    this.setConnection('mysql');
    this.modalService
      .open(content, {backdrop: 'static', size: 'lg'})
      .result
      .then((result) => {

      }, (reason) => {

      });
  }

  setConnection(type: string) {
    if(type === 'mysql') {
      this.newConnection = {
        type: 'mysql',
        port: 3306,
        logging: true,
        logger: 'advanced-console'
      };
    }
    if(type === 'postgres') {
      this.newConnection = {
        type: 'postgres',
        port: 5432,
        logging: true,
        logger: 'advanced-console'
      };
    }
  }

  testConnection() {
    this.clientConnectionService.testConnection(this.newConnection)
      .subscribe(connectionStatus => {
        this.connectionStatus = connectionStatus;
      });
  }

  saveConnection() {
    this.clientConnectionService.save(this.newConnection)
      .subscribe(connection => {
        this.newConnection = connection;
      });
  }

  connect(name: string) {
    this.userDefinedConnectionService.connect(name);
  }

  tabChange($event: NgbTabChangeEvent) {
    this.setConnection($event.nextId);
  }
}
