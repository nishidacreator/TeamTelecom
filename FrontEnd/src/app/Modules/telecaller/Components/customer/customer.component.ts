import { Subscription } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { TelecallerService } from '../../telecaller.service';
import { Bsnl } from '../../Models/bsnl_base';
import { Asianet } from '../../Models/asianet_base';
import { Bajaj } from '../../Models/bajaj_base';
import { Vi } from '../../Models/vi_base';
import { FolloeUp } from '../../Models/followUp';
import { AsianetFollowup } from '../../Models/asianet_followup';
import { BajajFollowup } from '../../Models/bajaj_followup';
import { ViFollowup } from '../../Models/vi_followup';
import { DatePipe } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent {
  pageSize = 10;
  pageIndex = 0;
  paginatedData: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userId!: number
  date!: any
  constructor(private router: Router, private authService: AuthService, private teleCallerService: TelecallerService,
    private datePipe: DatePipe){
    const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)
      this.userId = user.id

      this.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    this.paginatedData = this.data.slice(startIndex, startIndex + event.pageSize);
  }

  ngOnInit() {
    this.getData();
    this.getFollowUp()
  }

  bsnl: any[] = []
  asianet: any[] = []
  bajaj: any[] = []
  vi: any[] = []
  data: any[] = []
  getData(){
    this.teleCallerService.getBsnl().subscribe(data =>{
      this.bsnl = data.filter(x => x.teleCallerId === this.userId && x.status === null)

      this.teleCallerService.getAsianet().subscribe(data =>{
        this.asianet = data.filter(x => x.teleCaller.id === this.userId && x.status === null)

        this.teleCallerService.getBajaj().subscribe(data =>{
          this.bajaj = data.filter(x => x.teleCaller.id === this.userId && x.status === null)

          this.teleCallerService.getVi().subscribe(data =>{
            this.vi = data.filter(x => x.teleCaller.id === this.userId && x.status === null)

            this.data = [...this.bsnl, ...this.asianet, ...this.bajaj, ...this.vi];
            console.log(this.data);

            this.paginatedData = this.data.slice(0, this.pageSize);
          })
        })
      })
    })
  }

  followSub!: Subscription
  bsnlFollow: FolloeUp[] = [];
  asianetFollow: AsianetFollowup[] = [];
  bajajFollow: BajajFollowup[] = [];
  viFollow: ViFollowup[] = [];
  follow: any[] = [];
  getFollowUp(){
    this.teleCallerService.getFollowUp().subscribe(data =>{
      this.bsnlFollow = data.filter(x=> this.datePipe.transform(x.date, 'dd/MM/yyyy') === this.date && x.status === null && x.caller.id === this.userId);
      console.log(this.bsnlFollow);

      this.teleCallerService.getAsianetFollowUp().subscribe(data =>{
        this.asianetFollow = data.filter(x=> this.datePipe.transform(x.date, 'dd/MM/yyyy') === this.date && x.status === null  && x.caller.id === this.userId);

        this.teleCallerService.getBajajFollowUp().subscribe(data =>{
          this.bajajFollow = data.filter(x=> this.datePipe.transform(x.date, 'dd/MM/yyyy') === this.date && x.status === null  && x.caller.id === this.userId);

          this.teleCallerService.getViFollowUp().subscribe(data =>{
            this.viFollow = data.filter(x=> this.datePipe.transform(x.date, 'dd/MM/yyyy') === this.date && x.status === null  && x.caller.id === this.userId);

            this.follow = [...this.bsnlFollow, ...this.asianetFollow, ...this.viFollow, ...this.bajajFollow]
          })
        })
      })
    })
  }

  openCustomer(id: number, projectId: number){
    this.router.navigateByUrl('/telecaller/customers/open/'+ id + '/' + projectId)
  }

  openCustomerFollowup(id: number, projectId: number){
    this.router.navigateByUrl('/telecaller/followupcustomers/open/'+ id + '/' + projectId)
  }
}
