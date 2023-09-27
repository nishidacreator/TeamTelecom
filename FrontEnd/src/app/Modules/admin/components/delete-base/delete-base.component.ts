import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import { AdminService } from '../../admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Status } from '../../models/status';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-base',
  templateUrl: './delete-base.component.html',
  styleUrls: ['./delete-base.component.scss']
})
export class DeleteBaseComponent {

  constructor(private adminService: AdminService, private fb: FormBuilder, private _snackBar: MatSnackBar){}

  deleteForm = this.fb.group({
    type: ['', Validators.required],
    projectId: ['', Validators.required],
    status: [ Validators.required]
  })

  ngOnInit(){
    this.getProject();
    this.getStatus();
  }

  project$!: Observable<Project[]>
  getProject() {
    this.project$ = this.adminService.getProject()
  }

  type = [{type: "Base"}, {type: "FollowUp"}]

  cbStatus = {id: 100, status: 'CallBack'}
  allStatus = {id: 200, status: 'All'}
  status: Status[] = [];
  getStatus() {
    this.adminService.getStatus().subscribe(res=>{
      this.status = res
      // this.status.push(this.allStatus, this.cbStatus)
      console.log(this.status)
    })
  }


  projectName!: string
  onDeleteFun(){
    if(this.deleteForm.getRawValue().type === 'Base'){
      this.adminService.getProjectById(this.deleteForm.getRawValue().projectId).subscribe((res)=>{
        this.projectName = res.projectName.toLowerCase()

        let data: any;

        if(this.deleteForm.getRawValue().status != 200){
          data = {
            status: this.deleteForm.getRawValue().status
          }
          if(res.projectName.toLowerCase() === 'asianetsales'){
            console.log(data)
              this.adminService.deleteAsianetSales(data).subscribe((res)=>{
                this._snackBar.open("Deleted successfully...","" ,{duration:3000})
                this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'asianetcollections'){
            this.adminService.deleteAsianet(data).subscribe((res)=>{
              this._snackBar.open("Deleted successfully...","" ,{duration:3000})
              this.clearControls()
          })
          }

          if(res.projectName.toLowerCase() === 'bajaj'){
              this.adminService.deleteBajaj(data).subscribe((res)=>{
                this._snackBar.open("Deleted successfully...","" ,{duration:3000})
                this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'visales'){
              this.adminService.deleteVi(data).subscribe((res)=>{
                this._snackBar.open("Deleted successfully...","" ,{duration:3000})
                this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'vicollections'){
            this.adminService.deleteViCollections(data).subscribe((res)=>{
              this._snackBar.open("Deleted successfully...","" ,{duration:3000})
              this.clearControls()
          })
          }
        }
        else{
            if(res.projectName.toLowerCase() === 'bsnl'){
              this.adminService.deleteAllBsnl().subscribe((res)=>{
                this._snackBar.open("Deleted successfully...","" ,{duration:3000})
                this.clearControls()
              })
            }

            if(res.projectName.toLowerCase() === 'asianetsales'){
                this.adminService.deleteAllAsianetSales().subscribe((res)=>{
                  this._snackBar.open("Deleted successfully...","" ,{duration:3000})
                  this.clearControls()
              })
            }

          if(res.projectName.toLowerCase() === 'asianetcollections'){
            this.adminService.deleteAllAsianet().subscribe((res)=>{
              this._snackBar.open("Deleted successfully...","" ,{duration:3000})
              this.clearControls()
          })
          }

          if(res.projectName.toLowerCase() === 'bajaj'){
              this.adminService.deleteAllBajaj().subscribe((res)=>{
                this._snackBar.open("Deleted successfully...","" ,{duration:3000})
                this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'visales'){
              this.adminService.deleteAllVi().subscribe((res)=>{
                this._snackBar.open("Deleted successfully...","" ,{duration:3000})
                this.clearControls()
            })
          }

          if(res.projectName.toLowerCase() === 'vicollections'){
            this.adminService.deleteAllViCollections().subscribe((res)=>{
              this._snackBar.open("Deleted successfully...","" ,{duration:3000})
              this.clearControls()
            })
          }
          }
      })
    }
    else{
      this.adminService.getProjectById(this.deleteForm.getRawValue().projectId).subscribe((res)=>{
        let data: any;
        if(this.deleteForm.getRawValue().status != 200){
          if(this.deleteForm.getRawValue().status != 100){
            data = {
              status: this.deleteForm.getRawValue().status
            }
          }else if(this.deleteForm.getRawValue().status === 100){
            data = {
              status: 'CallBack'
            }
          }
        if(res.projectName.toLowerCase() === 'bsnl'){
          this.adminService.deleteBsnlFollow(data).subscribe((res)=>{
            this._snackBar.open("Deleted successfully...","" ,{duration:3000})
            this.clearControls()
        })
      }

      if(res.projectName.toLowerCase() === 'asianetsales'){
          this.adminService.deleteAsianetSalesFollow(data).subscribe((res)=>{
            this._snackBar.open("Deleted successfully...","" ,{duration:3000})
            this.clearControls()
        })
      }

      if(res.projectName.toLowerCase() === 'asianetcollections'){
        this.adminService.deleteAsianetFollow(data).subscribe((res)=>{
          this._snackBar.open("Deleted successfully...","" ,{duration:3000})
          this.clearControls()
      })
      }

      if(res.projectName.toLowerCase() === 'bajaj'){
          this.adminService.deleteBajajFollow(data).subscribe((res)=>{
            this._snackBar.open("Deleted successfully...","" ,{duration:3000})
            this.clearControls()
        })
      }

      if(res.projectName.toLowerCase() === 'visales'){
          this.adminService.deleteViFollow(data).subscribe((res)=>{
            this._snackBar.open("Deleted successfully...","" ,{duration:3000})
            this.clearControls()
        })
      }

      if(res.projectName.toLowerCase() === 'vicollections'){
        this.adminService.deleteViCollectionsFollow(data).subscribe((res)=>{
          this._snackBar.open("Deleted successfully...","" ,{duration:3000})
          this.clearControls()
      })
      }
      }else{
        if(res.projectName.toLowerCase() === 'bsnl'){
          this.adminService.deleteAllBsnlFollow().subscribe((res)=>{
            this._snackBar.open("Deleted successfully...","" ,{duration:3000})
            this.clearControls()
          })
        }

        if(res.projectName.toLowerCase() === 'asianetsales'){
          console.log(data)
            this.adminService.deleteAllAsianetFollow().subscribe((res)=>{
              this._snackBar.open("Deleted successfully...","" ,{duration:3000})
              this.clearControls()
          })
        }

      if(res.projectName.toLowerCase() === 'asianetcollections'){
        console.log(data)
        this.adminService.deleteAllAsianetSalesFollow().subscribe((res)=>{
          this._snackBar.open("Deleted successfully...","" ,{duration:3000})
          this.clearControls()
      })
      }

      if(res.projectName.toLowerCase() === 'bajaj'){
          this.adminService.deleteAllBajajFollow().subscribe((res)=>{
            this._snackBar.open("Deleted successfully...","" ,{duration:3000})
            this.clearControls()
        })
      }

      if(res.projectName.toLowerCase() === 'visales'){
          this.adminService.deleteAllViFollow().subscribe((res)=>{
            this._snackBar.open("Deleted successfully...","" ,{duration:3000})
            this.clearControls()
        })
      }

      if(res.projectName.toLowerCase() === 'vicollections'){
        this.adminService.deleteAllViCollectionsFollow().subscribe((res)=>{
          this._snackBar.open("Deleted successfully...","" ,{duration:3000})
          this.clearControls()
        })
      }
      }
    })
    }
  }
  clearControls(){
    this.deleteForm.reset()
    this.deleteForm.setErrors(null)
    Object.keys(this.deleteForm.controls).forEach(key=>{this.deleteForm.get(key)?.setErrors(null)})
  }
}
