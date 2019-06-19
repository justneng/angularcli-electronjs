import {Component, OnInit} from '@angular/core';
import {ElectronService} from './provider/electron.service';
import {TranslateService} from '@ngx-translate/core';
import {AppConfig} from '../environments/environment';
import {UserDefinedConnectionService} from './provider/user-defined-connection.service';
import {AppConnection} from './common/type';
import {PathService} from './provider/path.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentUserDefinedConnection: AppConnection;

  constructor(public electronService: ElectronService,
              public pathService: PathService,
              private translate: TranslateService,
              private userDefinedConnectionService: UserDefinedConnectionService) {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    this.userDefinedConnectionService
      .connection
      .subscribe(connection => {
        this.currentUserDefinedConnection = connection;
      });
  }

  ngOnInit(): void {
  }

  anyActive(): boolean {
    return this.userDefinedConnectionService.anyActive();
  }

  mysqlIsActive(): boolean {
    return this.userDefinedConnectionService.mysqlIsActive();
  }

  postgresqlIsActive(): boolean {
    return this.userDefinedConnectionService.postgresqlIsActive();
  }

  disconnect() {
    this.userDefinedConnectionService.disconnect();
  }
}
