import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { Project } from '../../models/project';
import { Status } from '../../models/status';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { User } from 'src/app/Modules/auth/models/user';

@Component({
  selector: 'app-hand-over',
  templateUrl: './hand-over.component.html',
  styleUrls: ['./hand-over.component.scss']
})
export class HandOverComponent {
  constructor(private adminService: AdminService, private fb: FormBuilder, private authService: AuthService){}

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  viewForm = this.fb.group({
    type: ['', Validators.required],
    projectId: ['', Validators.required],
    userId: [Validators.required]
  })

  ngOnInit(){
    this.getProject()
    this.getUsers()
  }

  project$!: Observable<Project[]>
  getProject() {
    this.project$ = this.adminService.getProject()
  }

  cbStatus = {id: 100, status: 'CallBack'}
  allStatus = {id: 200, status: 'All'}
  users: User[] = [];
  userSub!: Subscription;
  getUsers() {
    this.userSub = this.authService.getUser().subscribe(res=>{
      this.users = res
    })
  }

  type = [{type: "Base"}, {type: "FollowUp"}]

  data: any;
  projectName!: string
  getProjectBase(){
    if(this.viewForm.getRawValue().type === 'Base'){
      this.adminService.getProjectById(this.viewForm.getRawValue().projectId).subscribe((res)=>{
        this.projectName = res.projectName.toLowerCase()
        console.log(this.projectName+"base")
        let data: any;
        if(this.projectName === "asianetsales"){}
        if(this.projectName === "asianetcollections"){}
        if(this.projectName === "visales"){}
        if(this.projectName === "vicollections"){}
        if(this.projectName === "bajaj"){}
      })
    }
    else{
      this.adminService.getProjectById(this.viewForm.getRawValue().projectId).subscribe((res)=>{
        this.projectName = res.projectName.toLowerCase()
        console.log(this.projectName+"followup")
        let data: any;
        if(this.projectName === "asianetsales"){}
        if(this.projectName === "asianetcollections"){}
        if(this.projectName === "visales"){}
        if(this.projectName === "vicollections"){}
        if(this.projectName === "bajaj"){}
      })
    }
  }

  clearControls(){
    // this.getProjects()
    // this.viewForm.reset()
    // this.viewForm.setErrors(null)
    // Object.keys(this.viewForm.controls).forEach(key=>{this.viewForm.get(key)?.setErrors(null)})
  }

}

