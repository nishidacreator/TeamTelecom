import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { TelecallerService } from '../../telecaller/telecaller.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  ngOnDestroy() {
    // this.bsnlSub.unsubscribe();
    // // this.asianetSub.unsubscribe();
    // this.bajajSub.unsubscribe();
    // this.viSub.unsubscribe();
  }

  constructor(private telecallerService: TelecallerService){}

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
      let bsnl = data

      this.asianetSub = this.telecallerService.getAsianet().subscribe(data =>{
        let asianet = data

        this.bajajSub = this.telecallerService.getBajaj().subscribe(data =>{
          let bajaj = data

          this.viSub = this.telecallerService.getVi().subscribe(data =>{
            let vi = data

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
      let bsnlFollow = data

      this.telecallerService.getAsianetFollowUp().subscribe(data =>{
        let asianetFollow = data;

        this.telecallerService.getBajajFollowUp().subscribe(data =>{
          let bajajFollow = data;

          this.telecallerService.getViFollowUp().subscribe(data =>{
            let viFollow = data;

            this.follow = [...bsnlFollow, ...asianetFollow, ...viFollow, ...bajajFollow]
            this.followCount = this.follow.filter(x => x.status != null).length
          })
        })
      })
    })
  }

}
