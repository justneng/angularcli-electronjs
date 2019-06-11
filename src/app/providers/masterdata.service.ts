import {Injectable, OnInit} from '@angular/core';
import {DatabaseConnectionService} from './database-connection.service';
import {Department} from '../model/department';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class MasterDataService implements OnInit {

  private readonly _db: any;
  private _departments: Department[] = [];
  private _subject = new BehaviorSubject([]);

  constructor(private dbConnection: DatabaseConnectionService) {
    this._db = dbConnection.connection;
    let departments: Department[] = [
      {
        name: 'ผู้จัดการฝ่ายขาย'
      },
      {
        name: 'หัวหน้างานฝ่ายบัญชี'
      },
      {
        name: 'การบัญชี-A'
      },
      {
        name: 'ผู้จัดการฝ่ายทรัพยากรบุคคล'
      }
    ] as Department[];

    departments.forEach(department => {
      this._db.department.find({$not: {name: department.name}}, (err, result) => {
        if (err) {
          throw new Error(err);
        }
        if (!result.length) {
          this._db.department.insert(department, (err, newDepartment) => {
            if (err) {
              throw new Error(err);
            }
          });
        }
      });
    });
  }

  ngOnInit(): void {
  }

  get departments(): Observable<Department[]> {
    if (!this._departments || !this._departments.length) {
      this._db.department.find({}, (err, result) => {
        if (err) {
          throw new Error(err);
        }
        this._departments = [...result];
        this._subject.next(this._departments);
      });
    } else {
      this._subject.next(this._departments);
    }
    return this._subject;
  }
}
