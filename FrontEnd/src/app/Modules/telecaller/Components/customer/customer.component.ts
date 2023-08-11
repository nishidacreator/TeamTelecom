import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { TelecallerService } from '../../telecaller.service';
import { Bsnl } from '../../Models/bsnl_base';
import { Asianet } from '../../Models/asianet_base';
import { Bajaj } from '../../Models/bajaj_base';
import { Vi } from '../../Models/vi_base';
import { FolloeUp } from '../../Models/followUp';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  userId!: number
  constructor(private router: Router, private authService: AuthService, private teleCallerService: TelecallerService){
    const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)
      this.userId = user.id
      console.log(this.userId)
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
      console.log(data)
      this.bsnl = data.filter(x => x.teleCallerId === this.userId && x.status === null)
      console.log(this.bsnl)

      this.teleCallerService.getAsianet().subscribe(data =>{
        this.asianet = data.filter(x => x.id === this.userId && x.status === null)

        this.teleCallerService.getBajaj().subscribe(data =>{
          this.bajaj = data.filter(x => x.id === this.userId && x.status === null)

          this.teleCallerService.getVi().subscribe(data =>{
            this.vi = data.filter(x => x.id === this.userId && x.status === null)

            this.data = [...this.bsnl, ...this.asianet, ...this.bajaj, ...this.vi];
            console.log(this.data);
          })
        })
      })
    })
  }

  followSub!: Subscription
  follow: FolloeUp[] = [];
  getFollowUp(){
    this.teleCallerService.getFollowUp().subscribe(data =>{
      this.follow = data;
      console.log(this.follow);
    })
  }

  openCustomer(id: number, projectId: number){
    this.router.navigateByUrl('/telecaller/customers/open/'+ id + '/' + projectId)
  }

}
