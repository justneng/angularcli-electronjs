import {NgModule} from '@angular/core';
import {DatabaseConnectionService} from '../provider/database-connection.service';
import {MasterDataService} from '../provider/masterdata.service';
import {ClientConnectionService} from '../provider/client-connection.service';
import {UserDefinedConnectionService} from '../provider/user-defined-connection.service';

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
