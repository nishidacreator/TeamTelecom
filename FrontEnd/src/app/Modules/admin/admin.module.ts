import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
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


@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    UploadExcelComponent,
    SettingsComponent,
    ClientsComponent,
    RoleComponent,
    UserComponent,
    ProjectTypeComponent,
    ProjectComponent,
    ProjectBaseComponent,
    DeleteBaseComponent,
    ExportBaseComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
