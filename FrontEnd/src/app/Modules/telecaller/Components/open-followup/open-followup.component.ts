import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { TelecallerService } from '../../telecaller.service';

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
    private teleCallerService: TelecallerService, private _snackBar: MatSnackBar){
    this.id = this.route.snapshot.params['id'];
    this.projectId = route.snapshot.params['projectId'];
  }

  nextForm = this.fb.group({
    remarks: [''],
    freeText: [''],
    action: ['']
  })

  customerForm = this.fb.group({
    status: [''],
    date: [''],
    time: [''],
    answer: ['']
  })

  data: any
  ngOnInit(){
    this.getProjectId()
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

      if(this.projectName == 'asianet'){
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

      if(this.projectName == 'vi'){
        this.dataSub = this.teleCallerService.getViFollowUpById(this.id).subscribe(res=>{
          console.log(res)
          this.customer = res
        })
      }
    })
  }


  status!: string
  missed(){
    this.status = "RNR"
  }

  backStat: boolean = false
  callBack(){
    this.backStat = !this.backStat

    this.status = "CallBack"
  }

  busy(){
    this.status = "CallBusy"
  }

  answerStat: boolean = false
  answered(){
    this.answerStat = !this.answerStat
    this.status = "CallAnswered"
  }

  nextStatus: boolean = false
  remarks!: any
  onSubmit(){
    this.nextStatus = true
    if(this.status === "CallAnswered"){
      if(this.customerForm.get('answer')?.value != undefined || null){
        this.remarks = this.customerForm.get('answer')?.value
        this.nextForm.get('remarks')?.setValue(this.remarks)
      }
    }
    let data = {
      date: this.customerForm.get('date')?.value,
      time: this.customerForm.get('time')?.value,
    }
    if(this.status === "CallBack"){
      console.log(data)
      if(this.projectName === 'bsnl'){
        this.teleCallerService.updateBsnlFollowupCallBack(this.id,data).subscribe(data =>{

          this.teleCallerService.getAsianetFollowUpById(this.id).subscribe(data =>{
            console.log(data)

            this.teleCallerService.addFollowUp(data).subscribe(res=>{
              console.log(res)
            })
          })
        })
      }

      if(this.projectName === 'asianet'){
        this.teleCallerService.updateAsianetFollowupCallBack(this.id,data).subscribe(data =>{

          this.teleCallerService.getAsianetFollowUpById(this.id).subscribe(data =>{
            console.log(data)

            this.teleCallerService.addAsianetFollowUp(data).subscribe(res=>{
              console.log(res)
            })
          })
        })
      }

      if(this.projectName === 'bajaj'){
        this.teleCallerService.updateBajajFollowupCallBack(this.id,data).subscribe(data =>{

          this.teleCallerService.getBajajFollowUpById(this.id).subscribe(data =>{
            console.log(data)

            this.teleCallerService.addBajajFollowUp(data).subscribe(res=>{
              console.log(res)
            })
          })
        })
      }

      if(this.projectName === 'vi'){
        this.teleCallerService.updateViFollowupCallBack(this.id,data).subscribe(data =>{

          this.teleCallerService.getViFollowUpById(this.id).subscribe(data =>{
            console.log(data)

            this.teleCallerService.addViFollowUp(data).subscribe(res=>{
              console.log(res)
            })
          })
        })
      }

    }

  }

  saveData(){
    let data = {
      status : this.status,
      remarks : this.nextForm.get('remarks')?.value,
      freeText: this.nextForm.get('freeText')?.value,
      action : this.nextForm.get('action')?.value
    }
    if(this.projectName == 'bsnl'){
      this.teleCallerService.updateBsnlFollowupResponse(this.id, data).subscribe(res=>{
        console.log(res)
        if(this.status === '')
        this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
        this.clearControls()
      })
    }

    if(this.projectName == 'asianet'){
      this.teleCallerService.updateAsianetFollowupResponse(this.id, data).subscribe(res=>{
        console.log(res)
        this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
        this.clearControls()
      })
    }

    if(this.projectName == 'bajaj'){
      this.teleCallerService.updateBajajFollowupResponse(this.id, data).subscribe(res=>{
        console.log(res)
        this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
        this.clearControls()
      })
    }

    if(this.projectName == 'vi'){
      this.teleCallerService.updateViFollowupResponse(this.id, data).subscribe(res=>{
        console.log(res)
        this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
        this.clearControls()
      })
    }

  }

  clearControls(){
    this.nextForm.reset()
    this.nextForm.setErrors(null)
    Object.keys(this.nextForm.controls).forEach(key=>{this.nextForm.get(key)?.setErrors(null)})
  }
}
