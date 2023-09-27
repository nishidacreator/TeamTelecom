import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { BajajComponent } from 'src/app/Modules/admin/components/Edit/bajaj/bajaj.component';
import { ViewAcComponent } from 'src/app/Modules/admin/components/View/view-ac/view-ac.component';
import { ViewAsComponent } from 'src/app/Modules/admin/components/View/view-as/view-as.component';
import { ViewVicComponent } from 'src/app/Modules/admin/components/View/view-vic/view-vic.component';
import { ViewVisComponent } from 'src/app/Modules/admin/components/View/view-vis/view-vis.component';
import { Project } from 'src/app/Modules/admin/models/project';
import { Status } from 'src/app/Modules/admin/models/status';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  userId!: number
  constructor(private adminService: AdminService, private fb: FormBuilder, private dialog: MatDialog){
    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)
    console.log(user)
    this.userId = user.id

  }

  viewForm = this.fb.group({
    type: ['', Validators.required],
    projectId: ['', Validators.required],
    status: [Validators.required]
  })

  ngOnInit(){
    this.getProject()
    this.getStatus()
  }

  project$!: Observable<Project[]>
  getProject() {
    this.project$ = this.adminService.getProject()
  }

  cbStatus = {id: 100, status: 'CallBack'}
  allStatus = {id: 200, status: 'All'}
  status: Status[] = [];
  getStatus() {
    this.adminService.getStatus().subscribe(res=>{
      this.status = res
      this.status.push(this.allStatus, this.cbStatus)
      console.log(this.status)
    })
  }

  type = [{type: "Base"}, {type: "FollowUp"}]

  data: any;
  projectName!: string
  getProjectBase(){
    if(this.viewForm.getRawValue().type === 'Base'){
      this.adminService.getProjectById(this.viewForm.getRawValue().projectId).subscribe((res)=>{
        this.projectName = res.projectName.toLowerCase()
        let data: any;

        if(this.viewForm.getRawValue().status != 200){
          if(this.viewForm.getRawValue().status != 100){
            data = {
              status: this.viewForm.getRawValue().status
            }
          }else if(this.viewForm.getRawValue().status === 100){
            data = {
              status: 'CallBack'
            }
          }

          if(res.projectName.toLowerCase() === 'asianetsales'){
            console.log(data)
            this.adminService.getAsianetSales(data).subscribe((res)=>{
              this.data = res.filter(data => data.teleCaller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'asianetcollections'){
            this.adminService.getAsianetCollections(data).subscribe((res)=>{
              this.data = res.filter(data => data.teleCaller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'visales'){
            this.adminService.getViSales(data).subscribe((res)=>{
              this.data = res.filter(data => data.teleCaller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'vicollections'){
            this.adminService.getViCollections(data).subscribe((res)=>{
              this.data = res.filter(data => data.teleCaller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'bajaj'){
            this.adminService.getBajaj(data).subscribe((res)=>{
              this.data = res.filter(data => data.teleCaller.id === this.userId)
              this.clearControls()
            })
          }
        }
        else{
          if(res.projectName.toLowerCase() === 'asianetsales'){
            this.adminService.getAllAsianetSales().subscribe((res)=>{
              this.data = res.filter(data => data.teleCaller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'asianetcollections'){
            this.adminService.getAllAsianetCollections().subscribe((res)=>{
              this.data = res.filter(data => data.teleCaller.id === this.userId)
              console.log(this.data)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'visales'){
            this.adminService.getAllViSales().subscribe((res)=>{
              this.data = res.filter(data => data.teleCaller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'vicollections'){
            this.adminService.getAllViCollections().subscribe((res)=>{
              this.data = res.filter(data => data.teleCaller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'bajaj'){
            this.adminService.getAllBajaj().subscribe((res)=>{
              this.data = res.filter(data => data.teleCaller.id === this.userId)
              this.clearControls()
            })
          }
        }
      })
    }
    else{
      this.adminService.getProjectById(this.viewForm.getRawValue().projectId).subscribe((res)=>{
        this.projectName = res.projectName.toLowerCase()
        let data: any;

        if(this.viewForm.getRawValue().status != 200){
          if(this.viewForm.getRawValue().status != 100){
            data = {
              status: this.viewForm.getRawValue().status
            }
          }else if(this.viewForm.getRawValue().status === 100){
            data = {
              status: 'CallBack'
            }
          }

          if(res.projectName.toLowerCase() === 'asianetsales'){
            this.adminService.getAsianetSalesFollowup(data).subscribe((res)=>{
              this.data = res.filter(data => data.caller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'asianetcollections'){
            this.adminService.getAsianetCollectionsFollowup(data).subscribe((res)=>{
              this.data = res.filter(data => data.caller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'visales'){
            this.adminService.getViSalesFollowup(data).subscribe((res)=>{
              this.data = res.filter(data => data.caller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'vicollections'){
            this.adminService.getViCollectionsFollowup(data).subscribe((res)=>{
              this.data = res.filter(data => data.caller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'bajaj'){
            this.adminService.getBajajFollowup(data).subscribe((res)=>{
              this.data = res.filter(data => data.caller.id === this.userId)
              this.clearControls()
            })
          }
        }
        else{
          if(res.projectName.toLowerCase() === 'asianetsales'){
            this.adminService.getAllAsianetSalesFollowup().subscribe((res)=>{
              this.data = res.filter(data => data.caller.id === this.userId)
              console.log(this.data)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'asianetcollections'){
            this.adminService.getAllAsianetCollectionsFollowup().subscribe((res)=>{
              this.data = res.filter(data => data.caller.id === this.userId)
              console.log(this.data)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'visales'){
            this.adminService.getAllViSalesFollowup().subscribe((res)=>{
              this.data = res.filter(data => data.caller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'vicollections'){
            this.adminService.getAllViCollectionsFollowup().subscribe((res)=>{
              this.data = res.filter(data => data.caller.id === this.userId)
              this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'bajaj'){
            this.adminService.getAllBajajFollowup().subscribe((res)=>{
              this.data = res.filter(data => data.caller.id === this.userId)
              this.clearControls()
            })
          }
        }
      })
    }
  }

  asianetColl(id: number){
    const dialogRef = this.dialog.open(ViewAcComponent, {
      data: {
        id: id,
        type: 'base'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProjectBase()
    })
  }

  asianetSale(id: number){
    const dialogRef = this.dialog.open(ViewAsComponent, {
      data: {
        id: id,
        type: this.viewForm.getRawValue().type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProjectBase()
    })
  }

  viColl(id: number){
    const dialogRef = this.dialog.open(ViewVicComponent, {
      data: {
        id: id,
        type: 'base'
      },
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProjectBase()
    })
  }

  viSales(id: number){
    const dialogRef = this.dialog.open(ViewVisComponent, {
      data: {
        id: id,
        type: 'base'
      },
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProjectBase()
    })
  }

  bajajFun(id: number){
    const dialogRef = this.dialog.open(BajajComponent, {
      data: {
        id: id,
        type: 'base'
      },
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProjectBase()
    })
  }

  clearControls(){
    // this.getProjects()
    // this.viewForm.reset()
    // this.viewForm.setErrors(null)
    // Object.keys(this.viewForm.controls).forEach(key=>{this.viewForm.get(key)?.setErrors(null)})
  }

}
