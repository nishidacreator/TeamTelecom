import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { TelecallerService } from '../../telecaller.service';
import { Status } from 'src/app/Modules/admin/models/status';

@Component({
  selector: 'app-open-followup',
  templateUrl: './open-followup.component.html',
  styleUrls: ['./open-followup.component.scss']
})
export class OpenFollowupComponent {
  ngOnDestroy() {
    this.projetSub.unsubscribe();
  }

  id!: number
  projectId!: number
  constructor(public route: ActivatedRoute, private fb: FormBuilder, private adminService: AdminService,
    private teleCallerService: TelecallerService, private _snackBar: MatSnackBar, private router: Router){
    this.id = this.route.snapshot.params['id'];
    this.projectId = route.snapshot.params['projectId'];
  }

  statusForm = this.fb.group({
    statusId: [''],
    date: [''],
    time: [''],
    remarks: [''],
    freeText: [''],
    action: ['']
  })

  data: any
  ngOnInit(){
    this.getProjectId()
    this.getStatus()
  }

  status$!: Observable<Status[]>
  getStatus(){
    this.status$ = this.adminService.getStatus()
  }

  projectName!: string;
  projetSub!: Subscription;
  customer!: any | undefined
  dataSub?: Subscription;
  getProjectId(){
    this.projetSub = this.adminService.getProjectById(this.projectId).subscribe(data => {
      this.projectName = data.projectName.toLowerCase();
      console.log(this.projectName)

      if(this.projectName == 'bsnl'){
        this.dataSub = this.teleCallerService.getFollowUpById(this.id).subscribe(res=>{
          console.log(res)
          this.customer = res
        })
      }

      if(this.projectName == 'asianetsales'){
        this.dataSub = this.teleCallerService.getAsianetSalesFollowUpById(this.id).subscribe(res=>{
          console.log(res)
          this.customer = res
        })
      }

      if(this.projectName == 'asianetcollections'){
        this.dataSub = this.teleCallerService.getAsianetFollowUpById(this.id).subscribe(res=>{
          console.log(res)
          this.customer = res
        })
      }

      if(this.projectName == 'bajaj'){
        this.dataSub = this.teleCallerService.getBajajFollowUpById(this.id).subscribe(res=>{
          console.log(res)
          this.customer = res
        })
      }

      if(this.projectName == 'visales'){
        this.dataSub = this.teleCallerService.getViFollowUpById(this.id).subscribe(res=>{
          console.log(res)
          this.customer = res
        })
      }

      if(this.projectName == 'vicollections'){
        this.dataSub = this.teleCallerService.getViCollectionFollowUpById(this.id).subscribe(res=>{
          console.log(res)
          this.customer = res
        })
      }
    })
  }

  backStat: boolean = false
  callBack(){
    this.backStat = !this.backStat
  }

  nextStatus: boolean = false
  remarks!: any
  onSubmit(){
    let data = {
      status : this.statusForm.get('statusId')?.value,
      remarks : this.statusForm.get('remarks')?.value,
      freeText : this.statusForm.get('freeText')?.value,
      action : this.statusForm.get('action')?.value,
      callTime: Date.now()
    }
    console.log(data)

    let statData = {
      status : 'CallBack',
      date: this.statusForm.get('date')?.value,
      time: this.statusForm.get('time')?.value,
      callTime: Date.now()
    }


    this.adminService.getStatusById(this.statusForm.getRawValue().statusId).subscribe(res =>{
      if(this.backStat){
        console.log(this.projectName)
        if(this.projectName === 'bsnl'){
          this.teleCallerService.updateBsnlFollowupCallBack(this.id,statData).subscribe(data =>{

            this.teleCallerService.getFollowUpById(this.id).subscribe(data =>{
              console.log(data)

              this.teleCallerService.addFollowUp(data).subscribe(res=>{
                console.log(res)
              })
            })
          })
        }

        if(this.projectName === 'asianetcollections'){
          console.log(statData)
          this.teleCallerService.updateAsianetFollowupCallBack(this.id,statData).subscribe(data =>{

            this.teleCallerService.getAsianetFollowUpById(this.id).subscribe(data =>{
              console.log(data)

              this.teleCallerService.addAsianetFollowUp(data).subscribe(res=>{
                console.log(res)
              })
            })
          })
        }

        if(this.projectName === 'asianetsales'){
          this.teleCallerService.updateAsianetSalesCallBack(this.id,statData).subscribe(data =>{

            this.teleCallerService.getAsianetSalesFollowUpById(this.id).subscribe(data =>{
              console.log(data)

              this.teleCallerService.addAsianetSalesFollowUp(data).subscribe(res=>{
                console.log(res)
              })
            })
          })
        }

        if(this.projectName === 'bajaj'){
          this.teleCallerService.updateBajajFollowupCallBack(this.id,statData).subscribe(data =>{

            this.teleCallerService.getBajajFollowUpById(this.id).subscribe(data =>{
              console.log(data)

              this.teleCallerService.addBajajFollowUp(data).subscribe(res=>{
                console.log(res)
              })
            })
          })
        }

        if(this.projectName === 'visales'){
          this.teleCallerService.updateViFollowupCallBack(this.id,statData).subscribe(data =>{

            this.teleCallerService.getViFollowUpById(this.id).subscribe(data =>{
              console.log(data)

              this.teleCallerService.addViFollowUp(data).subscribe(res=>{
                console.log(res)
              })
            })
          })
        }

        if(this.projectName === 'vicollections'){
          this.teleCallerService.updateViFollowupCallBack(this.id,statData).subscribe(data =>{

            this.teleCallerService.getViCollectionFollowUpById(this.id).subscribe(data =>{
              console.log(data)

              this.teleCallerService.addViCollectionFollowUp(data).subscribe(res=>{
                console.log(res)
              })
            })
          })
        }

      }
      else{
        if(this.projectName == 'bsnl'){
          this.teleCallerService.updateBsnlFollowupResponse(this.id, data).subscribe(res=>{
            console.log(res)
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'asianetcollections'){
          console.log(data)
          this.teleCallerService.updateAsianetFollowupResponse(this.id, data).subscribe(res=>{
            console.log(res)
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'asianetsales'){
          console.log(data)
          this.teleCallerService.updateAsianetSalesFollowupResponse(this.id, data).subscribe(res=>{
            console.log(res)
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'bajaj'){
          this.teleCallerService.updateBajajFollowupResponse(this.id, data).subscribe(res=>{
            console.log(res)
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'visales'){
          console.log(data)
          this.teleCallerService.updateViFollowupResponse(this.id, data).subscribe(res=>{
            console.log(res)
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'vicollections'){
          this.teleCallerService.updateViCollectionFollowupResponse(this.id, data).subscribe(res=>{
            console.log(res)
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }
      }

    })
    this.clearControls();
    this.router.navigateByUrl('/telecaller/customers')

  }

  clearControls(){
    this.statusForm.reset()
    this.statusForm.setErrors(null)
    Object.keys(this.statusForm.controls).forEach(key=>{this.statusForm.get(key)?.setErrors(null)})
  }

}
