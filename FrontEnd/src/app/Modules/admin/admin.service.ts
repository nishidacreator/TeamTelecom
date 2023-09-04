import { AsianetFollowup } from './../telecaller/Models/asianet_followup';
import { DeleteBaseComponent } from './components/delete-base/delete-base.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectType } from './models/projectType';
import { Client } from './models/client';
import { Project } from './models/project';
import { Status } from './models/status';
import { Asianet } from '../telecaller/Models/asianet_base';
import { AsianetSalesBase } from '../telecaller/Models/asianet_sales_base';
import { Bajaj } from '../telecaller/Models/bajaj_base';
import { Vi } from '../telecaller/Models/vi_base';
import { ViCollection } from '../telecaller/Models/vi_collection_base';
import { ViFollowup } from '../telecaller/Models/vi_followup';
import { ViCollectionFollowup } from '../telecaller/Models/vi_collection_followup';
import { BajajFollowup } from '../telecaller/Models/bajaj_followup';
import { AsianetSaleFollowup } from '../telecaller/Models/asianet_sales_followup';

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

  // status
  getStatusById(id: any):Observable<Status>{
    return this._http.get<Status>(this.url + '/status/'+ id)
  }

  getStatus(): Observable<Status[]>{
    return this._http.get<Status[]>(this.url + '/status')
  }

  addStatus(data: any){
    return this._http.post(this.url + '/status', data)
  }

  deleteStatus(id: number){
    return this._http.delete(this.url + '/status/'+ id)
  }

  updateStatus(id: number, data: any): Observable<Status>{
    return this._http.patch<Status>(this.url + '/status/'+ id, data)
  }

  // PROJECT BASE

  addBsnl(data: any){
    return this._http.post(this.url + '/bsnl', data, {reportProgress: true, observe: 'events'});
  }

  getBsnl(){
    return this._http.get(this.url + '/bsnl');
  }

  addAsianet(data: any){
    return this._http.post(this.url + '/asianet', data, {reportProgress: true, observe: 'events'});
  }

  getAsianetCollections(data: any):Observable<Asianet[]>{
    const queryParams = new HttpParams().set('status', data.status);
    return this._http.get<Asianet[]>(this.url + '/asianet', { params: queryParams });
  }

  getAllAsianetCollections():Observable<Asianet[]>{
    return this._http.get<Asianet[]>(this.url + '/asianet/all');
  }

  getAsianetCollectionsFollowup(data: any):Observable<AsianetFollowup[]>{
    const queryParams = new HttpParams().set('status', data.status);
    return this._http.get<AsianetFollowup[]>(this.url + '/asianetfollowUp', { params: queryParams });
  }

  getAllAsianetCollectionsFollowup():Observable<AsianetFollowup[]>{
    return this._http.get<AsianetFollowup[]>(this.url + '/asianetfollowUp/all');
  }

  addAsianetSales(data: any){
    return this._http.post(this.url + '/asianetsales', data, {reportProgress: true, observe: 'events'});
  }

  getAsianetSales(data: any):Observable<AsianetSalesBase[]>{
    const queryParams = new HttpParams().set('status', data.status);
    return this._http.get<AsianetSalesBase[]>(this.url + '/asianetsales', { params: queryParams });
  }

  getAllAsianetSales():Observable<AsianetSalesBase[]>{
    return this._http.get<AsianetSalesBase[]>(this.url + '/asianetsales/all');
  }

  getAsianetSalesFollowup(data: any):Observable<AsianetSaleFollowup[]>{
    const queryParams = new HttpParams().set('status', data.status);
    return this._http.get<AsianetSaleFollowup[]>(this.url + '/asianetsalesfollow', { params: queryParams });
  }

  getAllAsianetSalesFollowup():Observable<AsianetSaleFollowup[]>{
    return this._http.get<AsianetSaleFollowup[]>(this.url + '/asianetsalesfollow/all');
  }

  addBajaj(data: any){
    return this._http.post(this.url + '/bajaj', data, {reportProgress: true, observe: 'events'});
  }

  getBajaj(data: any):Observable<Bajaj[]>{
    const queryParams = new HttpParams().set('status', data.status);
    return this._http.get<Bajaj[]>(this.url + '/bajaj', { params: queryParams });
  }

  getAllBajaj():Observable<Bajaj[]>{
    return this._http.get<Bajaj[]>(this.url + '/bajaj/all');
  }

  getBajajFollowup(data: any):Observable<BajajFollowup[]>{
    const queryParams = new HttpParams().set('status', data.status);
    return this._http.get<BajajFollowup[]>(this.url + '/bajajfollowUp', { params: queryParams });
  }

  getAllBajajFollowup():Observable<BajajFollowup[]>{
    return this._http.get<BajajFollowup[]>(this.url + '/bajajfollowUp/all');
  }

  addVi(data: any){
    return this._http.post(this.url + '/vi', data, {reportProgress: true, observe: 'events'});
  }

  getViSales(data: any): Observable<Vi[]>{
    const queryParams = new HttpParams().set('status', data.status);
    return this._http.get<Vi[]>(this.url + '/vi', { params: queryParams });
  }

  getAllViSales():Observable<Vi[]>{
    return this._http.get<Vi[]>(this.url + '/vi/all');
  }

  getViSalesFollowup(data: any):Observable<ViFollowup[]>{
    const queryParams = new HttpParams().set('status', data.status);
    return this._http.get<ViFollowup[]>(this.url + '/vifollowUp', { params: queryParams });
  }

  getAllViSalesFollowup():Observable<ViFollowup[]>{
    return this._http.get<ViFollowup[]>(this.url + '/vifollowUp/all');
  }

  addViCollections(data: any){
    return this._http.post(this.url + '/vicollections', data, {reportProgress: true, observe: 'events'});
  }

  getViCollections(data: any):Observable<ViCollection[]>{
    const queryParams = new HttpParams().set('status', data.status);
    return this._http.get<ViCollection[]>(this.url + '/vicollections', { params: queryParams });
  }

  getAllViCollections():Observable<ViCollection[]>{
    return this._http.get<ViCollection[]>(this.url + '/vicollections/all');
  }

  getViCollectionsFollowup(data: any):Observable<ViCollectionFollowup[]>{
    const queryParams = new HttpParams().set('status', data.status);
    return this._http.get<ViCollectionFollowup[]>(this.url + '/vicollectionsfollow', { params: queryParams });
  }

  getAllViCollectionsFollowup():Observable<ViFollowup[]>{
    return this._http.get<ViFollowup[]>(this.url + '/vicollectionsfollow/all');
  }
  deleteBsnl(data: any){
    const queryParams = new HttpParams().set('status', data.status);

    return this._http.delete(this.url + '/bsnl', { params: queryParams });
  }

  deleteAsianet(data: any){
    const queryParams = new HttpParams().set('status', data.status);
    return this._http.delete(this.url + '/asianet', { params: queryParams });
  }

  deleteAsianetSales(data: any){
    const queryParams = new HttpParams().set('status', data.status);

    return this._http.delete(this.url + '/asianetsales', { params: queryParams });
  }

  deleteBajaj(data: any){
     const queryParams = new HttpParams().set('status', data.status);

    return this._http.delete(this.url + '/bajaj', { params: queryParams });
  }

  deleteVi(data: any){
    const queryParams = new HttpParams().set('status', data.status);

    return this._http.delete(this.url + '/vi',{ params: queryParams });
  }

  deleteViCollections(data: any){
    const queryParams = new HttpParams().set('status', data.status);

    return this._http.delete(this.url + '/vicollections', { params: queryParams });
  }

  deleteAllBsnl(){
    return this._http.delete(this.url + '/bsnl/alldata')
  }

  deleteAllAsianet(){
    return this._http.delete(this.url + '/asianet/alldata')
  }

  deleteAllAsianetSales(){
    return this._http.delete(this.url + '/asianetsales/alldata')
  }

  deleteAllBajaj(){
    return this._http.delete(this.url + '/bajaj/alldata')
  }

  deleteAllVi(){
    return this._http.delete(this.url + '/vi/alldata')
  }

  deleteAllViCollections(){
    return this._http.delete(this.url + '/vicollections/alldata')
  }

  deleteBsnlFollow(data: any){
    const queryParams = new HttpParams().set('status', data.status);

    return this._http.delete(this.url + '/followUp', { params: queryParams });
  }

  deleteAsianetFollow(data: any){
    const queryParams = new HttpParams().set('status', data.status);

    return this._http.delete(this.url + '/asianetfollowUp', { params: queryParams });
  }

  deleteAsianetSalesFollow(data: any){
    const queryParams = new HttpParams().set('status', data.status);

    return this._http.delete(this.url + '/asianetsalesfollow', { params: queryParams });
  }

  deleteBajajFollow(data: any){
    const queryParams = new HttpParams().set('status', data.status);

    return this._http.delete(this.url + '/bajajfollowUp', { params: queryParams });
  }

  deleteViFollow(data: any){
    const queryParams = new HttpParams().set('status', data.status);

    return this._http.delete(this.url + '/vifollowUp', { params: queryParams });
  }

  deleteViCollectionsFollow(data: any){
    const queryParams = new HttpParams().set('status', data.status);

    return this._http.delete(this.url + '/vicollectionsfollow', { params: queryParams });
  }

  deleteAllBsnlFollow(){
    return this._http.delete(this.url + '/followUp/alldata')
  }

  deleteAllAsianetFollow(){
    return this._http.delete(this.url + '/asianetfollowUp/alldata')
  }

  deleteAllAsianetSalesFollow(){
    return this._http.delete(this.url + '/asianetsalesfollow/alldata')
  }

  deleteAllBajajFollow(){
    return this._http.delete(this.url + '/bajajfollowUp/alldata')
  }

  deleteAllViFollow(){
    return this._http.delete(this.url + '/vifollowUp/alldata')
  }

  deleteAllViCollectionsFollow(){
    return this._http.delete(this.url + '/vicollectionsfollow/alldata')
  }
}
