import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { OpenCustomerComponent } from './Components/open-customer/open-customer.component';

const routes: Routes = [
  {path: '', component:NavbarComponent,
  children:[
    {path: 'home', component: DashboardComponent},
    {path: '', component:HomeComponent},
    {path: 'customers', component:CustomerComponent},
    {path: 'customers/open/:id', component:OpenCustomerComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelecallerRoutingModule { }
