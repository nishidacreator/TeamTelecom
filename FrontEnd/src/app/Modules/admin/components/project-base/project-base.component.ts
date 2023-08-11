import { Bajaj } from './../../../telecaller/Models/bajaj_base';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import { AdminService } from '../../admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-base',
  templateUrl: './project-base.component.html',
  styleUrls: ['./project-base.component.scss']
})
export class ProjectBaseComponent {

  constructor(private adminService: AdminService, private fb: FormBuilder, private _snackBar: MatSnackBar){}

  baseForm = this.fb.group({
    projectId: ['', Validators.required]
  })

  ngOnInit(){
    this.getProject()
  }

  selectedFile!: File
  fileUpload(event: any) {
    this.selectedFile = event.target.files[0];
  }

  project$!: Observable<Project[]>
  getProject() {
    this.project$ = this.adminService.getProject()
  }

  addProject(){}

  onUpload() {

  }

  onSubmit(){
    console.log(this.baseForm.get('projectId')?.value)
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imageUrl', this.selectedFile, this.selectedFile.name);

      const projectId = this.baseForm.get('projectId')?.value;
      if (projectId) {
        formData.append('projectId', projectId);
      }

      this.adminService.getProjectById(this.baseForm.get('projectId')?.value).subscribe((res)=>{
        console.log(res);

        if(res.projectName.toLowerCase() === 'bsnl'){
          this.adminService.addBsnl(formData).subscribe(data => {
            console.log(data);
          })
        }

        if(res.projectName.toLowerCase() === 'asianet'){
          this.adminService.addAsianet(formData).subscribe(data => {
            console.log(data);
          })
        }

        if(res.projectName.toLowerCase() === 'bajaj'){
          this.adminService.addBajaj(formData).subscribe(data => {
            console.log(data);
          })
        }

        if(res.projectName.toLowerCase() === 'vi'){
          this.adminService.addVi(formData).subscribe(data => {
            console.log(data);
          })
        }
      })
    }

    this._snackBar.open("Projects added successfully...","" ,{duration:3000})
    this.clearControls()
  }

  clearControls(){
    // this.getProjects()
    this.baseForm.reset()
    this.baseForm.setErrors(null)
    Object.keys(this.baseForm.controls).forEach(key=>{this.baseForm.get(key)?.setErrors(null)})
  }
}
