import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Customer } from '../../Models/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { Observable, Subscription } from 'rxjs';
import { TelecallerService } from '../../telecaller.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/Modules/admin/models/status';

@Component({
  selector: 'app-open-customer',
  templateUrl: './open-customer.component.html',
  styleUrls: ['./open-customer.component.scss']
})
export class OpenCustomerComponent {

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
    date: ['', Validators.required],
    time: ['', Validators.required],
    remarks: [''],
    freeText: [''],
    action: ['']
  })

  data: any
  ngOnInit(){
    this.getProjectId();
    this.getStatus();
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
        this.dataSub = this.teleCallerService.getBsnlById(this.id).subscribe(res=>{
          console.log(res)
          this.customer = res
        })
      }

      if(this.projectName == 'asianetsales'){
        this.dataSub = this.teleCallerService.getAsianetSalesById(this.id).subscribe(res=>{
          console.log(res)
          this.customer = res
        })
      }

      if(this.projectName == 'asianetcollections'){
        this.dataSub = this.teleCallerService.getAsianetById(this.id).subscribe(res=>{
          console.log(res)
          this.customer = res
        })
      }

      if(this.projectName == 'bajaj'){
        this.dataSub = this.teleCallerService.getBajajById(this.id).subscribe(res=>{
          console.log(res)
          this.customer = res
        })
      }

      if(this.projectName == 'visales'){
        this.dataSub = this.teleCallerService.getViById(this.id).subscribe(res=>{
          console.log(res)
          this.customer = res
        })
      }

      if(this.projectName == 'vicollections'){
        this.dataSub = this.teleCallerService.getViCollectionsById(this.id).subscribe(res=>{
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
          this.teleCallerService.updateBsnlCallBack(this.id,statData).subscribe(data =>{

            this.teleCallerService.getBsnlById(this.id).subscribe(data =>{
              console.log(data)

              this.teleCallerService.addFollowUp(data).subscribe(res=>{
                console.log(res)
              })
            })
          })
        }

        if(this.projectName === 'asianetcollections'){
          this.teleCallerService.updateAsianetCallBack(this.id,statData).subscribe(data =>{

            this.teleCallerService.getAsianetById(this.id).subscribe(data =>{

              this.teleCallerService.addAsianetFollowUp(data).subscribe(res=>{
                console.log(res)
              })
            })
          })
        }

        if(this.projectName === 'asianetsales'){
          this.teleCallerService.updateAsianetSalesCallBack(this.id,statData).subscribe(data =>{

            this.teleCallerService.getAsianetSalesById(this.id).subscribe(data =>{
              console.log(data)

              this.teleCallerService.addAsianetSalesFollowUp(data).subscribe(res=>{
                console.log(res)
              })
            })
          })
        }

        if(this.projectName === 'bajaj'){
          this.teleCallerService.updateBajajCallBack(this.id,statData).subscribe(data =>{

            this.teleCallerService.getBajajById(this.id).subscribe(data =>{
              console.log(data)

              this.teleCallerService.addBajajFollowUp(data).subscribe(res=>{
                console.log(res)
              })
            })
          })
        }

        if(this.projectName === 'visales'){
          this.teleCallerService.updateViCallBack(this.id,statData).subscribe(data =>{

            this.teleCallerService.getViById(this.id).subscribe(data =>{
              console.log(data)

              this.teleCallerService.addViFollowUp(data).subscribe(res=>{
                console.log(res)
              })
            })
          })
        }

        if(this.projectName === 'vicollections'){
          console.log(this.id, statData)
          this.teleCallerService.updateViCollectionsCallBack(this.id,statData).subscribe(data =>{

            this.teleCallerService.getViCollectionsById(this.id).subscribe(data =>{
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
          this.teleCallerService.updateBsnlResponse(this.id, data).subscribe(res=>{
            console.log(res)
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'asianetcollections'){
          console.log(data)
          this.teleCallerService.updateAsianetResponse(this.id, data).subscribe(res=>{
            console.log(res)
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'asianetsales'){
          console.log(data)
          this.teleCallerService.updateAsianetSalesResponse(this.id, data).subscribe(res=>{
            console.log(res)
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'bajaj'){
          this.teleCallerService.updateBajajResponse(this.id, data).subscribe(res=>{
            console.log(res)
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'visales'){
          console.log(data)
          this.teleCallerService.updateViResponse(this.id, data).subscribe(res=>{
            console.log(res)
            this._snackBar.open("Response Updated successfully...","" ,{duration:3000})
          })
        }

        if(this.projectName == 'vicollections'){
          this.teleCallerService.updateViCollectionsResponse(this.id, data).subscribe(res=>{
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
