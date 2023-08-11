import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Role } from 'src/app/Modules/auth/models/role';
import { User } from 'src/app/Modules/auth/models/user';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AdminService } from '../../admin.service';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(private fb: FormBuilder,public dialog: MatDialog, private adminService: AdminService,
    private _snackBar: MatSnackBar, private router: Router, private authService: AuthService){}

  userForm = this.fb.group({
    name: ['', Validators.required],
    employeeNo: ['', Validators.required],
    phoneNumber: ['',[Validators.required,  Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    email: ['', [Validators.required, Validators.email]],
    password:['',Validators.required],
    roleId: ['', Validators.required],
    status: [false, Validators.required]
  });

  ngOnDestroy(): void {
    this.userSubscriptions.unsubscribe()
  }

  ngOnInit() {
    this.getRole()

    this.userSubscriptions = this.getUsers()
  }

  roles$!: Observable<Role[]>
  roleSubscription?: Subscription;
  getRole(){
    return this.roles$ = this.authService.getRole()
  }

  onSubmit(){
    this.authService.addUser(this.userForm.getRawValue()).subscribe((res)=>{
      this._snackBar.open("User added successfully...","" ,{duration:3000})
      this.clearControls()
    },(error=>{
      alert(error)
    }))
  }

  clearControls(){
    this.getUsers()
    this.userForm.reset()
    this.userForm.setErrors(null)
    Object.keys(this.userForm.controls).forEach(key=>{this.userForm.get(key)?.setErrors(null)})
  }

  displayedColumns : string[] = ['id','name', 'employeeId','phoneNumber', 'email','roleId','status','manage']

  users : User[]=[];
  userSubscriptions! : Subscription;
  getUsers(){
    return this.authService.getUser().subscribe((res)=>{
      this.users = res
    })
  }

  deleteUser(id: number){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.authService.deleteUser(id).subscribe((res)=>{
          this.getUsers()
          this._snackBar.open("User deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }

  isEdit = false;
  userId : any;
  editUser(id : any){
    this.isEdit = true;
    //Get the product based on the ID
    let user: any= this.users.find(x =>x.id == id)

    //Populate the object by the ID
    let name = user.name.toString();
    let phoneNumber = user.phoneNumber.toString();
    let email = user.email.toString();
    let roleId = user.roleId;
    let status = user.status;
    let employeeNo = user.employeeNo;

    this.userForm.patchValue({
      name : name,
      phoneNumber : phoneNumber,
      email : email,
      roleId : roleId,
      status : status,
      employeeNo : employeeNo
    })
    this.userId = id;
  }

  editFunction(){
    this.isEdit = false;

    let data: any ={
      name : this.userForm.get('name')?.value,
      phoneNumber : this.userForm.get('phoneNumber')?.value,
      password : this.userForm.get('password')?.value,
      roleId : this.userForm.get('roleId')?.value,
      status : this.userForm.get('status')?.value,
      email : this.userForm.get('email')?.value,
      employeeNo : this.userForm.get('employeeNo')?.value
    }

    this.authService.updateUser(this.userId, data).subscribe((res)=>{
      this._snackBar.open("User updated successfully...","" ,{duration:3000})
      this.getUsers();
      this.clearControls();
    },(error=>{
          alert(error.message)
        }))
  }

  addRole(){
    this.router.navigateByUrl('admin/settings/user/addrole')
  }

}
