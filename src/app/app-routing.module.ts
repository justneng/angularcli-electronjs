import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user-management',
    component: UserManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
