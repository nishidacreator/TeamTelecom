import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { AsianetSalesBase } from 'src/app/Modules/telecaller/Models/asianet_sales_base';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AdminService } from '../../../admin.service';
import { ViCollection } from 'src/app/Modules/telecaller/Models/vi_collection_base';

@Component({
  selector: 'app-vi-collections',
  templateUrl: './vi-collections.component.html',
  styleUrls: ['./vi-collections.component.scss']
})
export class ViCollectionsComponent {
  id!: number
  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthService, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.id = data.id;
    }

  ngOnDestroy() {
    this.baseSub.unsubscribe();
  }

  editForm = this.fb.group({
    Region: [''],
    Subcode: [''],
    Name: [''],
    Address: [''],
    Address1: [''],
    Address2: [''],
    Package: [''],
    Scheme: [''],
    Phone: [''],
    Balance: [''],
    Mobile: [''],
    status: [''],
    remarks: [''],
    freeText: [''],
    action: [''],
    Teleby: ['']
  });

  ngOnInit(): void {
    this.editBase()
  }

  baseSub!: Subscription;
  base!: any;
  roleId : any;
  editBase(){
    if(this.data.type === 'base'){
      this.baseSub = this.adminService.getViCollById(this.id).subscribe(data => {
        this.base = data

        //Populate the object by the ID
        let Region = this.base.Region?.toString();
        let Subcode = this.base.Subcode?.toString();
        let Name = this.base.Name?.toString();
        let Address = this.base.Address?.toString();
        let Address1 = this.base.Address1?.toString();
        let Address2 = this.base.Address2?.toString();
        let Package = this.base.Package?.toString();
        let Scheme = this.base.Scheme?.toString();
        let Phone = this.base.Phone?.toString();
        let Balance = this.base.Balance?.toString();
        let Mobile = this.base.Mobile?.toString();
        let status = this.base.status?.toString();
        let remarks = this.base.remarks?.toString();
        let freeText = this.base.freeText?.toString();
        let action = this.base.action?.toString();
        this.editForm.patchValue({
          Region : Region,
          Subcode : Subcode,
          Name : Name,
          Address : Address,
          Address1 : Address1,
          Address2 : Address2,
          Package : Package,
          Scheme : Scheme,
          Phone : Phone,
          Balance : Balance,
          Mobile : Mobile,
          status : status,
          remarks : remarks,
          freeText : freeText,
          action : action
        })
      })
    }else if(this.data.type === 'follow'){
      this.baseSub = this.adminService.getViCollFollowById(this.id).subscribe(data => {
        this.base = data

        //Populate the object by the ID
        let Region = this.base.Region?.toString();
        let Subcode = this.base.Subcode?.toString();
        let Name = this.base.Name?.toString();
        let Address = this.base.Address?.toString();
        let Address1 = this.base.Address1?.toString();
        let Address2 = this.base.Address2?.toString();
        let Package = this.base.Package?.toString();
        let Scheme = this.base.Scheme?.toString();
        let Phone = this.base.Phone?.toString();
        let Balance = this.base.Balance?.toString();
        let Mobile = this.base.Mobile?.toString();
        let status = this.base.status?.toString();
        let remarks = this.base.remarks?.toString();
        let freeText = this.base.freeText?.toString();
        let action = this.base.action?.toString();
        this.editForm.patchValue({
          Region : Region,
          Subcode : Subcode,
          Name : Name,
          Address : Address,
          Address1 : Address1,
          Address2 : Address2,
          Package : Package,
          Scheme : Scheme,
          Phone : Phone,
          Balance : Balance,
          Mobile : Mobile,
          status : status,
          remarks : remarks,
          freeText : freeText,
          action : action
        })
      })
    }
  }

  editFunction(){
     let data: any ={
      Region : this.editForm.get('Region')?.value,
      Subcode : this.editForm.get('Subcode')?.value,
      Name : this.editForm.get('Name')?.value,
      Address : this.editForm.get('Address')?.value,
      Address1 : this.editForm.get('Address1')?.value,
      Address2 : this.editForm.get('Address2')?.value,
      Package : this.editForm.get('Package')?.value,
      Scheme : this.editForm.get('Scheme')?.value,
      Phone : this.editForm.get('Phone')?.value,
      Balance : this.editForm.get('Balance')?.value,
      Mobile : this.editForm.get('Mobile')?.value,
      status : this.editForm.get('status')?.value,
      remarks : this.editForm.get('remarks')?.value,
      freeText : this.editForm.get('freeText')?.value,
      action : this.editForm.get('action')?.value
    }

    if(this.data.type === 'base'){
      this.adminService.updateViCollById(this.id, data).subscribe((res)=>{
        this._snackBar.open("ViCollections updated successfully...","" ,{duration:3000})
        this.clearControls();
        this.dialogRef.close();
      },(error=>{
            alert(error.message)
          }))
    }else if(this.data.type){
      this.adminService.updateViCollFollowById(this.id, data).subscribe((res)=>{
        this._snackBar.open("ViCollections updated successfully...","" ,{duration:3000})
        this.clearControls();
        this.dialogRef.close();
      },(error=>{
            alert(error.message)
          }))
    }
  }

  clearControls(){
    this.editForm.reset()
    this.editForm.setErrors(null)
    Object.keys(this.editForm.controls).forEach(key=>{this.editForm.get(key)?.setErrors(null)})
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
