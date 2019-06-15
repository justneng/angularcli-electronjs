import {app, BrowserWindow, screen} from 'electron';
import * as path from 'path';
import * as url from 'url';
import {global} from '@angular/compiler/src/util';
import {UserDefinedConnection} from './src/app/entity/user-defined-connection.entity';
import {HealthInformation} from './src/app/entity/health-information.entity';
import {ConnectionOptions} from 'typeorm';

const {ipcMain} = require('electron');
const fs = require('fs');
const root = fs.readdirSync('/');
const S3 = require('aws-sdk/clients/s3');
const args = process.argv.slice(1);
const typeorm = require('typeorm');

let win, serve;
serve = args.some(val => val === '--serve');

global.serve = serve;
global.typeorm = typeorm;
global.clientConnection = {
  instance: undefined,
  repo: {},
  information: {}
};
global.userDefinedConnection = {
  instance: undefined,
  repo: {},
  information: {}
};

async function createWindow() {

  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.setResizable(false);

  await createClientConnection()
    .then(connection => {
      global.clientConnection.instance = connection;
      registerRepository(connection);
    })
    .catch(error => {
      throw new Error(error);
    });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

ipcMain.on('synchronous-user-defined-connection', (event, options) => {
  createUserDefinedConnection(options)
    .then(connection => {
      global.userDefinedConnection.instance = connection;
      global.userDefinedConnection.information = options;
      registerUserDefinedRepository(connection);
      event.returnValue = '[Main Process] : I received your request and set the value to global variable. Now you can access by name \'userDefinedConnection\'.';
    })
    .catch(error => {
      throw new Error(error);
    });
});

async function createClientConnection() {
  return typeorm.createConnection({
    name: 'client-database',
    type: 'sqlite',
    synchronize: true,
    logging: true,
    logger: 'simple-console',
    database: 'database.sqlite',
    entities: [
      UserDefinedConnection
    ]
  });
}

async function createUserDefinedConnection(options: ConnectionOptions) {
  return typeorm.createConnection(
    {
      ...options,
      entities: [HealthInformation]
    });
}


function registerRepository(connection: any) {
  global.clientConnection.repo.userDefinedConnectionRepository = connection.getRepository(UserDefinedConnection);
}

function registerUserDefinedRepository(connection: any) {
  global.userDefinedConnection.repo.healthInformationRepository = connection.getRepository(HealthInformation);
}
