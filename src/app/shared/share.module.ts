import {NgModule} from '@angular/core';
import {DatabaseConnectionService} from '../providers/database-connection.service';
import {MasterDataService} from '../providers/masterdata.service';
import {ClientConnectionService} from '../providers/client-connection.service';
import {UserDefinedConnectionService} from '../providers/user-defined-connection.service';

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  providers: [
    DatabaseConnectionService,
    ClientConnectionService,
    UserDefinedConnectionService,
    MasterDataService
  ]
})
export class ShareModule {

}
