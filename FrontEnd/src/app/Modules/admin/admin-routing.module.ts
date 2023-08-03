import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomerComponent } from '../telecaller/Components/customer/customer.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';

const routes: Routes = [
  {path: '', component:NavbarComponent,
    children:[
      {path: '', component: DashboardComponent},
      {path: 'home', component:HomeComponent},
      {path: 'upload', component:UploadExcelComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
