import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectType } from './models/projectType';
import { Client } from './models/client';
import { Project } from './models/project';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }

  url = 'http://localhost:8000'

  // PROJECT TYPE
  getProjectTypeById(id: number):Observable<ProjectType>{
    return this._http.get<ProjectType>(this.url + '/projecttype/'+ id)
  }

  getProjectType(): Observable<ProjectType[]>{
    return this._http.get<ProjectType[]>(this.url + '/projecttype')
  }

  addProjectType(data: any){
    return this._http.post(this.url + '/projecttype', data)
  }

  deleteProjectType(id: number){
    return this._http.delete(this.url + '/projecttype/'+ id)
  }

  updateProjectType(id: number, data: any): Observable<ProjectType>{
    return this._http.patch<ProjectType>(this.url + '/projecttype/'+ id, data)
  }

  //CLIENT
  getClientById(id: number):Observable<Client>{
    return this._http.get<Client>(this.url + '/client/'+ id)
  }

  getClient(): Observable<Client[]>{
    return this._http.get<Client[]>(this.url + '/client')
  }

  addClient(data: any){
    return this._http.post(this.url + '/client', data)
  }

  deleteClient(id: number){
    return this._http.delete(this.url + '/client/'+ id)
  }

  updateClient(id: number, data: any): Observable<Client>{
    return this._http.patch<Client>(this.url + '/client/'+ id, data)
  }

      //PROJECT

  getProjectById(id: any):Observable<Project>{
    return this._http.get<Project>(this.url + '/project/'+ id)
  }

  getProject(): Observable<Project[]>{
    return this._http.get<Project[]>(this.url + '/project')
  }

  addProject(data: any){
    return this._http.post(this.url + '/project', data)
  }

  deleteProject(id: number){
    return this._http.delete(this.url + '/project/'+ id)
  }

  updateProject(id: number, data: any): Observable<Project>{
    return this._http.patch<Project>(this.url + '/project/'+ id, data)
  }


  // PROJECT BASE

  addBsnl(data: any){
    return this._http.post(this.url + '/bsnl', data);
  }

  addAsianet(data: any){
    return this._http.post(this.url + '/asianet', data);
  }

  addBajaj(data: any){
    return this._http.post(this.url + '/bajaj', data);
  }

  addVi(data: any){
    return this._http.post(this.url + '/vi', data);
  }
}