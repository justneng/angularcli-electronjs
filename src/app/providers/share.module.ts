import {NgModule} from '@angular/core';
import {DatabaseConnectionService} from './database-connection.service';
import {MasterDataService} from './masterdata.service';

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  providers: [
    DatabaseConnectionService,
    MasterDataService
  ]
})
export class ShareModule {

}
