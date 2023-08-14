import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UploadExcelComponent } from './components/upload-excel/upload-excel.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ClientsComponent } from './components/clients/clients.component';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';
import { ProjectTypeComponent } from './components/project-type/project-type.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectBaseComponent } from './components/project-base/project-base.component';
import { DeleteBaseComponent } from './components/delete-base/delete-base.component';
import { ExportBaseComponent } from './components/export-base/export-base.component';

const routes: Routes = [
  {path: '', component:NavbarComponent,
    children:[
      {path: '', component: DashboardComponent},
      {path: 'home', component: DashboardComponent},
      {path: 'projectbase', component: ProjectBaseComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'projects', component: ProjectComponent},
      {path: 'exportbase', component: ExportBaseComponent},

      {path: 'settings', component: SettingsComponent},
      {path: 'settings/role', component: RoleComponent},
      {path: 'settings/user', component: UserComponent},
      {path: 'settings/projecttype', component: ProjectTypeComponent},
      {path: 'settings/deletebase', component: DeleteBaseComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
