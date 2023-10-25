import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from 'src/app/Modules/admin/components/user/user.component';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  userId!: number;
  date!: any;
  currentMonth!: any;
  constructor(private authServeice: AuthService, private dialog:MatDialog, private adminService:AdminService,
    private datePipe: DatePipe,){
    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)
    this.userId = user.id

    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.date)

    const currentDate = new Date();
    this.currentMonth  = currentDate.toISOString().slice(0, 7);
  }

  ngOnInit() {
    this.getUser()
    this.getCompletedCalls();
    this.getFollowupCalls();
  }

  userSub!: Subscription;
  users!: User;
  getUser(){
    this.userSub = this.authServeice.getUserById(this.userId).subscribe(user =>{
      this.users = user
      console.log(this.users)
    })
  }

  editProfile(){
    const dialogRef = this.dialog.open(UserComponent, {
      data: {status : 'true', id : this.userId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUser()
    })
  }

  //reports
  bsnlSub!: Subscription;
  asianetSub!: Subscription;
  bajajSub!: Subscription;
  viSub!: Subscription;
  comCall!: number;
  pendCall!: number;
  data: any[] = [];
  assignedToday!: number;
  assignedMonth!: number;
  comCallMonth!: number;
  getCompletedCalls(){
    // this.bsnlSub = this.telecallerService.getBsnlCaller().subscribe(data =>{
    //   let bsnl = data.filter(x=>x.teleCallerId === this.userId)

      this.asianetSub = this.adminService.getAllAsianetSales().subscribe(data =>{
        let asianet = data.filter(x=>x.teleCaller.id === this.userId)

        this.bajajSub = this.adminService.getAllBajaj().subscribe(data =>{
          let bajaj = data.filter(x=>x.teleCaller.id === this.userId)

          this.viSub = this.adminService.getAllViCollections().subscribe(data =>{
            let vi = data.filter(x=>x.teleCaller.id === this.userId)

            this.asianetSub = this.adminService.getAllAsianetCollections().subscribe(data =>{
              let asianetColl = data.filter(x=>x.teleCaller.id === this.userId)

              this.asianetSub = this.adminService.getAllViSales().subscribe(data =>{
                let viSale = data.filter(x=>x.teleCaller.id === this.userId)

                this.data = [...asianet, ...bajaj, ...vi, ...asianetColl, ...viSale];

                this.assignedToday = this.data.filter(x=> this.datePipe.transform(x.createdAt, 'yyyy-MM-dd') == this.date).length
                this.comCall = this.data.filter(x => x.status != 1 && this.datePipe.transform(x.callTime, 'yyyy-MM-dd') == this.date).length
                this.pendCall = this.data.filter(x => x.status === 1).length

                this.assignedMonth = this.data.filter(x=> this.datePipe.transform(x.createdAt, 'yyyy-MM') == this.currentMonth).length
                this.comCallMonth = this.data.filter(x => x.status != 1 && this.datePipe.transform(x.callTime, 'yyyy-MM') == this.currentMonth).length
                console.log(this.comCallMonth)
              // })
            })
          })
        })
      })
    })
  }

  follow: any[] = [];
  followCount!: number
  todayCount!: number
  todayComCount!: number;
  followCountMonth!: number;
  pendingCount!: number;
  monthComCount!: number;
  getFollowupCalls(){
    // this.telecallerService.getFollowUpCaller().subscribe(data =>{
    //   let bsnlFollow = data.filter(x=>x.caller.id === this.userId)

      this.adminService.getAllAsianetSalesFollowup().subscribe(data =>{
        let asianetFollow = data.filter(x=>x.caller.id === this.userId)

        this.adminService.getAllBajajFollowup().subscribe(data =>{
          let bajajFollow = data.filter(x=>x.caller.id === this.userId)

          this.adminService.getAllViCollectionsFollowup().subscribe(data =>{
            let viFollow = data.filter(x=>x.caller.id === this.userId)

            this.adminService.getAllAsianetCollectionsFollowup().subscribe(data =>{
              let asianetColl = data.filter(x=>x.caller.id === this.userId)

              this.adminService.getAllViSalesFollowup().subscribe(data =>{
                let viSale = data.filter(x=>x.caller.id === this.userId)

                this.follow = [ ...asianetFollow, ...viFollow, ...bajajFollow, ...asianetColl, ...viSale]

                this.followCount = this.follow.filter(x => this.datePipe.transform(x.createdAt, 'yyyy-MM-dd') == this.date).length
                this.todayCount = this.follow.filter(x => this.datePipe.transform(x.createdAt, 'yyyy-MM') === this.date).length
                this.todayComCount = this.follow.filter(x => x.status != 1 && x.date === this.date).length

                this.followCountMonth = this.follow.filter(x => this.datePipe.transform(x.createdAt, 'yyyy-MM') == this.currentMonth).length
                this.pendingCount = this.follow.filter(x => this.datePipe.transform(x.date, 'yyyy-MM') === this.currentMonth).length
                this.monthComCount = this.follow.filter(x => x.status != 1 && x.date === this.date).length
              // })
            })
          })
        })
      })
    })
  }

}
