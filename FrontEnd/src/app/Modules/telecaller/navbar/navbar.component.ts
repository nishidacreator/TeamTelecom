import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isExpanded : boolean = false;

  userName: string
  userId!: number
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router,
    private _snackBar: MatSnackBar,private dialog: MatDialog) {

    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)
    this.userName = user.employeeNo.toUpperCase()
    this.userId = user.id

    // this.startCounter();
  }

  myProfile(){
    this.router.navigateByUrl('admin/settings/userdetails/'+ this.userId)
  }

  logOut(){
    this.authService.logout()
    this.router.navigateByUrl('')
  }

  // private intervalId: any;
  // seconds: number = 0;
  // formattedTime: string = '00:00:00';
  // startCounter(): void {
  //   this.intervalId = setInterval(() => {
  //     this.seconds++;
  //     this.updateFormattedTime();
  //   }, 1000);
  // }

  // updateFormattedTime(): void {
  //   const hours = Math.floor(this.seconds / 3600);
  //   const minutes = Math.floor((this.seconds % 3600) / 60);
  //   const seconds = this.seconds % 60;

  //   this.formattedTime = `${this.formatTimeUnit(hours)}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
  // }

  // formatTimeUnit(unit: number): string {
  //   return unit.toString().padStart(2, '0');
  // }

  ngOnDestroy(): void {
    // clearInterval(this.intervalId);
  }

}
