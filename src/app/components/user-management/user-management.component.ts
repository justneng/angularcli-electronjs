import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {DatabaseConnectionService} from '../../providers/database-connection.service';
import {MasterDataService} from '../../providers/masterdata.service';
import {Department} from '../../model/department';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  private readonly _db: any;
  users: User[] = [];
  user: User = new User();
  departments: Department[] = [];
  msgs: Message[] = [];

  constructor(private dbConnection: DatabaseConnectionService,
              private masterData: MasterDataService,
              private messageService: MessageService,
              private changeDetectorRef: ChangeDetectorRef) {

    this._db = this.dbConnection.connection;
    this.masterData.departments.subscribe(departments => {
      this.departments = departments;
    });
  }

  ngOnInit() {
    this.findAllUser();
  }

  addUser() {
    if (this.user._id) {
      this._db.user.update({_id: this.user._id}, {...this.user}, (err, updatedValue) => {
        this.msgs = [];
        if (err) {
          this.msgs.push({severity: 'error', summary: 'Error Message', detail: err});
          throw new Error(err);
        } else {
          this.msgs.push({severity: 'success', summary: 'Success Message', detail: 'แก้ไขข้อมูลสำเร็จ'});
          this.user = new User();
          this.findAllUser();
        }
      });
    } else {
      this._db.user.insert(
        this.user, (err, newUser) => {
          this.msgs = [];
          if (err) {
            this.msgs.push({severity: 'error', summary: 'Info Message', detail: err});
            throw new Error(err);
          } else {
            this.msgs.push({severity: 'success', summary: 'Info Message', detail: 'บันทึกข้อมูลสำเร็จ'});
            this.user = new User();
            this.findAllUser();
          }
        }
      );
    }
  }

  findAllUser() {
    this._db.user.find({}, (err, users) => {
      console.log('find all users any error? ', err);
      console.log('users ', users);
      this.users = [...users];
      this.changeDetectorRef.detectChanges();
    });
  }

  edit(user: User) {
    this.user = {...user};
    console.log(this.user)
    this.changeDetectorRef.detectChanges();
  }

  delete(user: User) {

  }
}
