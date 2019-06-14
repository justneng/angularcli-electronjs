import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ClientConnectionService} from '../../providers/client-connection.service';
import {ConnectionStatus} from '../../type/connection-status';
import {UserDefinedConnection} from '../../entity/user-defined-connection.entity';
import {UserDefinedConnectionService} from '../../providers/user-defined-connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  newConnection: any = {};
  connectionStatus: ConnectionStatus;
  closeResult: string;
  userDefinedConnections: UserDefinedConnection[] = [];

  currentUserDefinedConnection: any;

  constructor(private modalService: NgbModal,
              private clientConnectionService: ClientConnectionService,
              private userDefinedConnectionService: UserDefinedConnectionService) {

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
      .connection
      .repo.userDefinedConnectionRepository
      .query('select * from user_defined_connection')
      .then(result => {
        this.userDefinedConnections = result;
      });
  }

  open(content) {
    this.setDefaultConnection();
    this.modalService.open(content, {backdrop: 'static', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  setDefaultConnection() {
    this.newConnection = {
      type: 'mysql',
      port: 3306,
      logging: true,
      logger: 'advanced-console'
    };
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  testConnection() {
    this.clientConnectionService.testConnection(this.newConnection)
      .subscribe(connectionStatus => {
        this.connectionStatus = connectionStatus;
      });
  }

  saveConnection() {
    this.clientConnectionService
      .connection
      .repo.userDefinedConnectionRepository
      .save(this.newConnection)
      .then(userDefinedConnection => {
        this.newConnection = userDefinedConnection;
      });
  }

  connect(name: string) {
    this.userDefinedConnectionService.connect(name);
  }
}
