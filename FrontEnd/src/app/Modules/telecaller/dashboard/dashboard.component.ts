import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TelecallerService } from '../telecaller.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  ngOnDestroy() {
    // this.bsnlSub.unsubscribe();
    // this.asianetSub.unsubscribe();
    // this.bajajSub.unsubscribe();
    // this.viSub.unsubscribe();
  }

  userId: number;
  date: any;
  constructor(private telecallerService: TelecallerService, private datePipe: DatePipe){
    const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)
      this.userId = user.id

      this.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

  ngOnInit() {
    this.getCompletedCalls();
    this.getFollowupCalls();
  }

  bsnlSub!: Subscription;
  asianetSub!: Subscription;
  bajajSub!: Subscription;
  viSub!: Subscription;
  comCall!: number;
  pendCall!: number;
  data: any[] = [];
  getCompletedCalls(){
    this.bsnlSub = this.telecallerService.getBsnl().subscribe(data =>{
      let bsnl = data.filter(x=>x.teleCallerId === this.userId)

      this.asianetSub = this.telecallerService.getAsianet().subscribe(data =>{
        let asianet = data.filter(x=>x.teleCaller.id === this.userId)

        this.bajajSub = this.telecallerService.getBajaj().subscribe(data =>{
          let bajaj = data.filter(x=>x.teleCaller.id === this.userId)

          this.viSub = this.telecallerService.getVi().subscribe(data =>{
            let vi = data.filter(x=>x.teleCaller.id === this.userId)

            this.data = [...bsnl, ...asianet, ...bajaj, ...vi];
            this.comCall = this.data.filter(x => x.status != null).length
            this.pendCall = this.data.filter(x => x.status === null).length
          })
        })
      })
    })
  }

  follow: any[] = [];
  followCount!: number
  getFollowupCalls(){
    this.telecallerService.getFollowUp().subscribe(data =>{
      let bsnlFollow = data.filter(x=>x.caller.id === this.userId)

      this.telecallerService.getAsianetFollowUp().subscribe(data =>{
        let asianetFollow = data.filter(x=>x.caller.id === this.userId);

        this.telecallerService.getBajajFollowUp().subscribe(data =>{
          let bajajFollow = data.filter(x=>x.caller.id === this.userId);

          this.telecallerService.getViFollowUp().subscribe(data =>{
            let viFollow = data.filter(x=>x.caller.id === this.userId);

            this.follow = [...bsnlFollow, ...asianetFollow, ...viFollow, ...bajajFollow]
            this.followCount = this.follow.filter(x => x.status != null).length
          })
        })
      })
    })
  }

}
