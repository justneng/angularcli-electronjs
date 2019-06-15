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
      return path.join('assets/', p);
    }
  }
}
