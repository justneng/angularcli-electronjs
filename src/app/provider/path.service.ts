import {Injectable} from '@angular/core';
import {remote} from 'electron';
import * as path from 'path';

const serve_mode = remote.getGlobal('serve');

@Injectable()
export class PathService {

  constructor() {
  }

  public resolveAssetsPath(p: string): any {
    if(serve_mode) {
      return path.join('../../../assets/', p);
    } else {
      //กรณีที่ run แบบ build electron [local, linux, windows, mac] ไฟล์ path จะถูก pack ไปที่ <<APP_ROOT_PATH>>/dist
      //และ folder assets เดิมที่อยู่ภายใต้ <<APP_ROOT_PATH>>/src/assets จะถูกย้ายไปที่ <<APP_ROOT_PATH>>/dist/assets
      //ทำให้ในการ dev และ release จะได้ที่อยู่ของ folder ต่างกัน
      return path.join('assets/', p);
    }
  }
}
