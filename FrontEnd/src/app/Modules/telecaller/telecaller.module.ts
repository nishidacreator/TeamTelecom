import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { TelecallerRoutingModule } from './telecaller-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { OpenCustomerComponent } from './Components/open-customer/open-customer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    CustomerComponent,
    OpenCustomerComponent,

  ],
  imports: [
    CommonModule,
    TelecallerRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TelecallerModule { }
