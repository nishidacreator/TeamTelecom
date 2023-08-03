import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mapTo, Observable, of, ReplaySubject, startWith, tap } from 'rxjs';
import { User } from './models/user';
import { Role } from './models/role';
// import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private readonly token = 'token'
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN'
  private loggedUser: any

  constructor(private _http:HttpClient) { }

  private  currentUserSource = new ReplaySubject<User>(1)

  currentUser$ = this.currentUserSource.asObservable().pipe(
    startWith()
  );

  url = 'http://localhost:8000'

  saveUser(data:any){
    return this._http.post(this.url+'/register',data)
  }

  login(data: any){
    return this._http.post(this.url + '/login', data)
    .pipe(
      tap((tokens) => this.doLoginUser(data.email, tokens)),
      mapTo(true),
      catchError((error: any) => {
        console.log(error)
        return of(false)
      })
    )
  }

  private doLoginUser(userName: String, tokens: any){
    // this.loggedUser = userName
    // console.log(this.loggedUser)
    this.storeTokens(tokens)
  }

  private storeTokens(tokens: any){
    localStorage.setItem(this.JWT_TOKEN, tokens.token.accessToken)
    // localStorage.setItem(this.REFRESH_TOKEN, tokens.token.refreshToken)
    localStorage.setItem('token', JSON.stringify(tokens))
  }

  getJwtToken(){
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isLoggedIn(): boolean{
    let loggedStatus = this.getJwtToken()
    return !!this.getJwtToken();
  }

  getRoleById(id: number):Observable<Role>{
    return this._http.get<Role>(this.url + '/role/'+ id)
  }

  logout(){
    localStorage.clear()
    // localStorage.removeItem(this.JWT_TOKEN);
    // localStorage.removeItem(this.REFRESH_TOKEN);
    // localStorage.removeItem(this.token);
    // return this._http.post(this.url + '/logout', {
    //   'refreshToken': this.getRefreshToken()
    // }).pipe(
    //   tap((tokens) => this.doLogoutUser()),
    //   mapTo(true),
    //   catchError((error: any) => {
    //     alert(error.error)
    //     return of(false)
    //   })
    // )

  }

  //  loginUser(data:any){
  //   return this._http.post(this.url+'/user/login',data).pipe(
  //     // tap((tokens) => this.doLoginUser(data.email, tokens)),
  //     // mapTo(true),
  //     // catchError((error: any) => {
  //     //   console.log(error)
  //     //   return of(false)
  //     // })
  //     map((res:any)=>{
  //       const user=res;
  //       console.log(user)
  //       localStorage.setItem(this.token,JSON.stringify(user))
  //       this.currentUserSource.next(user)
  //       return user.role.toLowerCase();
  //     })
  //   )
  //  }

  //  private doLoginUser(userName: String, tokens: any){
  //   this.loggedUser = userName
  //   console.log(this.loggedUser)
  //   this.storeTokens(tokens)
  // }

  // private storeTokens(tokens: any){
  //   // localStorage.setItem('token',JSON.stringify(user))
  //   localStorage.setItem(this.token, tokens.token.accessToken)
  //   // localStorage.setItem(this.REFRESH_TOKEN, tokens.token.refreshToken)
  // }

  // getJwtToken(){
  //   console.log(this.token)
  //   return localStorage.getItem(this.token);
  // }

  // isLoggedIn(): boolean{
  //   let loggedStatus = !!this.getJwtToken()
  //   console.log(loggedStatus)
  //   return !!this.getJwtToken();
  // }

  //  logoutUser(){
  //   localStorage.removeItem(this.token);
  //   // localStorage.removeItem("currentUser");
  //   // this.currentUserSource.next(null)
  //  }

// prevents automatic logout
  //  setCurrentUser(user:User){
  //   localStorage.setItem("loggedUser", JSON.stringify(user))
  //   this.currentUserSource.next(user)
  //  }

}
