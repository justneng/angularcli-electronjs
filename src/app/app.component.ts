import {Component, OnInit} from '@angular/core';
import {ElectronService} from './provider/electron.service';
import {TranslateService} from '@ngx-translate/core';
import {AppConfig} from '../environments/environment';
import {MenuItem} from 'primeng/api';
import {createConnection} from 'typeorm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menu: MenuItem[];
  breadcrumbs: MenuItem[];

  constructor(public electronService: ElectronService,
              private translate: TranslateService) {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit(): void {
    this.menu = [{
      label: 'File',
      items: [
        {label: 'New', icon: 'pi pi-fw pi-plus'},
        {label: 'Download', icon: 'pi pi-fw pi-download'}
      ]
    },
      {
        label: 'Edit',
        items: [
          {label: 'Add User', icon: 'pi pi-fw pi-user-plus'},
          {label: 'Remove User', icon: 'pi pi-fw pi-user-minus'}
        ]
      }];

    this.breadcrumbs = [
      {label: 'Categories'},
      {label: 'Sports'},
      {label: 'Football'},
      {label: 'Countries'},
      {label: 'Spain'},
      {label: 'F.C. Barcelona'},
      {label: 'Squad'},
      {label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'}
    ];

  }

  testConnection() {
    createConnection(
      {
        name: 'user-defined',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'computer',
        database: 'mylocaldatabase'
      }
    ).then(connection => {
      console.log('get connection from service = ', connection);
    });
  }
}
