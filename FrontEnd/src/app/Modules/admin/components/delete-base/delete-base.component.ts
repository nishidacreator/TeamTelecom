import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import { AdminService } from '../../admin.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-base',
  templateUrl: './delete-base.component.html',
  styleUrls: ['./delete-base.component.scss']
})
export class DeleteBaseComponent {

  constructor(private adminService: AdminService, private fb: FormBuilder){}

  deleteForm = this.fb.group({
    type: ['', Validators.required],
    projectId: ['', Validators.required],
    status: ['', Validators.required]
  })

  ngOnInit(){
    this.getProject();
  }

  project$!: Observable<Project[]>
  getProject() {
    this.project$ = this.adminService.getProject()
  }

  type = [{type: "Base"}, {type: "FollowUp"}]
  status = [{type: "RNR"}, {type: "CallBusy"}, {type: "CallBack"},{type: "Answered"}, {type: "All"}]

  onDeleteFun(){
    if(this.deleteForm.getRawValue().type === 'Base'){
      this.adminService.getProjectById(this.deleteForm.getRawValue().projectId).subscribe((res)=>{
        let data ={
          status: this.deleteForm.getRawValue().status
        }
        if(res.projectName.toLowerCase() === 'bsnl'){
          if(this.deleteForm.getRawValue().status === 'All'){
            this.adminService.deleteAllBsnl().subscribe(res =>{
              console.log(res)
            })
          }
          else{
              this.adminService.deleteBsnl(data).subscribe((res)=>{
              console.log(res)
            })
          }

        }

        if(res.projectName.toLowerCase() === 'asianet'){
          if(this.deleteForm.getRawValue().status === 'All'){
            this.adminService.deleteAllAsianet().subscribe(res =>{
              console.log(res)
            })
          }
          else{
              this.adminService.deleteAsianet(data).subscribe((res)=>{
              console.log(res)
            })
          }

        }

        if(res.projectName.toLowerCase() === 'bajaj'){
          if(this.deleteForm.getRawValue().status === 'All'){
            this.adminService.deleteAllBajaj().subscribe(res =>{
              console.log(res)
            })
          }
          else{
              this.adminService.deleteBajaj(data).subscribe((res)=>{
              console.log(res)
            })
          }

        }

        if(res.projectName.toLowerCase() === 'vi'){
          if(this.deleteForm.getRawValue().status === 'All'){
            this.adminService.deleteAllVi().subscribe(res =>{
              console.log(res)
            })
          }
          else{
              this.adminService.deleteVi(data).subscribe((res)=>{
              console.log(res)
            })
          }

        }

      })
    }
    else{
      this.adminService.getProjectById(this.deleteForm.getRawValue().projectId).subscribe((res)=>{
        let data ={
          status: this.deleteForm.getRawValue().status
        }
        if(res.projectName.toLowerCase() === 'bsnl'){
          if(this.deleteForm.getRawValue().status === 'All'){
            this.adminService.deleteAllBsnlFollow().subscribe(res =>{
              console.log(res)
            })
          }
          else{
              this.adminService.deleteBsnlFollow(data).subscribe((res)=>{
              console.log(res)
            })
          }

        }

        if(res.projectName.toLowerCase() === 'asianet'){
          if(this.deleteForm.getRawValue().status === 'All'){
            this.adminService.deleteAllAsianetFollow().subscribe(res =>{
              console.log(res)
            })
          }
          else{
              this.adminService.deleteAsianetFollow(data).subscribe((res)=>{
              console.log(res)
            })
          }

        }

        if(res.projectName.toLowerCase() === 'bajaj'){
          if(this.deleteForm.getRawValue().status === 'All'){
            this.adminService.deleteAllBajajFollow().subscribe(res =>{
              console.log(res)
            })
          }
          else{
              this.adminService.deleteBajajFollow(data).subscribe((res)=>{
              console.log(res)
            })
          }

        }

        if(res.projectName.toLowerCase() === 'vi'){
          if(this.deleteForm.getRawValue().status === 'All'){
            this.adminService.deleteAllViFollow().subscribe(res =>{
              console.log(res)
            })
          }
          else{
              this.adminService.deleteViFollow(data).subscribe((res)=>{
              console.log(res)
            })
          }

        }

      })
    }
    this.clearControls()
  }
  clearControls(){
    this.deleteForm.reset()
    this.deleteForm.setErrors(null)
    Object.keys(this.deleteForm.controls).forEach(key=>{this.deleteForm.get(key)?.setErrors(null)})
  }
}
