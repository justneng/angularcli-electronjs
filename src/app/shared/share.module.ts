import {NgModule} from '@angular/core';
import {DatabaseConnectionService} from '../provider/database-connection.service';
import {MasterDataService} from '../provider/masterdata.service';
import {ClientConnectionService} from '../provider/client-connection.service';
import {UserDefinedConnectionService} from '../provider/user-defined-connection.service';
import {PathService} from '../provider/path.service';

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  providers: [
    DatabaseConnectionService,
    ClientConnectionService,
    UserDefinedConnectionService,
    PathService,
    MasterDataService
  ]
})
export class ShareModule {

}
