import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bsnl } from './Models/bsnl_base';
import { Observable } from 'rxjs';
import { Asianet } from './Models/asianet_base';
import { Bajaj } from './Models/bajaj_base';
import { Vi } from './Models/vi_base';
import { FolloeUp } from './Models/followUp';
import { AsianetFollowup } from './Models/asianet_followup';
import { BajajFollowup } from './Models/bajaj_followup';
import { ViFollowup } from './Models/vi_followup';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelecallerService {

  constructor(private _http:HttpClient) { }

  url = environment.baseUrl

  // BSNL
  getBsnl(): Observable<Bsnl[]>{
    return this._http.get<Bsnl[]>(this.url + '/bsnl');
  }

  getBsnlById(id: number): Observable<Bsnl>{
    return this._http.get<Bsnl>(this.url + '/bsnl/' +id);
  }

  updateBsnlCallBack(id: number, data: any): Observable<Bsnl>{
    return this._http.patch<Bsnl>(this.url + '/bsnl/callback/' + id, data)
  }

  updateBsnlResponse(id: number, data: any): Observable<Bsnl>{
    return this._http.patch<Bsnl>(this.url + '/bsnl/' + id, data)
  }

  // BAJAJ
  getBajaj(): Observable<Bajaj[]>{
    return this._http.get<Bajaj[]>(this.url + '/bajaj');
  }

  getBajajById(id: number): Observable<Bajaj>{
    return this._http.get<Bajaj>(this.url + '/bajaj/' +id);
  }

  updateBajajResponse(id: number, data: any): Observable<Bajaj>{
    return this._http.patch<Bajaj>(this.url + '/bajaj/' + id, data)
  }

  updateBajajCallBack(id: number, data: any): Observable<Bajaj>{
    return this._http.patch<Bajaj>(this.url + '/bajaj/callback/' + id, data)
  }

  addBajajFollowUp(data: any){
    return this._http.post(this.url + '/bajajfollowUp', data)
  }

  getBajajFollowUp():Observable<BajajFollowup[]>{
    return this._http.get<BajajFollowup[]>(this.url + '/bajajfollowUp')
  }

  getBajajFollowUpById(id: number):Observable<BajajFollowup>{
    return this._http.get<BajajFollowup>(this.url + '/bajajfollowUp/' + id)
  }

  updateBajajFollowupCallBack(id: number, data: any): Observable<BajajFollowup>{
    return this._http.patch<BajajFollowup>(this.url + '/bajajfollowup/callback/' + id, data)
  }

  updateBajajFollowupResponse(id: number, data: any): Observable<BajajFollowup>{
    return this._http.patch<BajajFollowup>(this.url + '/bajajfolllowup/' + id, data)
  }

  // ASIANET
  getAsianet(): Observable<Asianet[]>{
    return this._http.get<Asianet[]>(this.url + '/asianet');
  }

  getAsianetById(id: number): Observable<Asianet>{
    return this._http.get<Asianet>(this.url + '/asianet/' +id);
  }

  updateAsianetResponse(id: number, data: any): Observable<Asianet>{
    return this._http.patch<Asianet>(this.url + '/asianet/' + id, data)
  }

  updateAsianetCallBack(id: number, data: any): Observable<Asianet>{
    return this._http.patch<Asianet>(this.url + '/asianet/callback/' + id, data)
  }

  addAsianetFollowUp(data: any){
    return this._http.post(this.url + '/asianetfollowUp', data)
  }

  getAsianetFollowUp():Observable<AsianetFollowup[]>{
    return this._http.get<AsianetFollowup[]>(this.url + '/asianetfollowUp')
  }

  getAsianetFollowUpById(id: number):Observable<AsianetFollowup>{
    return this._http.get<AsianetFollowup>(this.url + '/asianetfollowUp/' + id)
  }

  updateAsianetFollowupResponse(id: number, data: any): Observable<AsianetFollowup>{
    return this._http.patch<AsianetFollowup>(this.url + '/asianetfollowup/' + id, data)
  }

  updateAsianetFollowupCallBack(id: number, data: any): Observable<AsianetFollowup>{
    return this._http.patch<AsianetFollowup>(this.url + '/asianetfollowup/callback/' + id, data)
  }

  // ASIANET SALES
  getAsianetSales(): Observable<Asianet[]>{
    return this._http.get<Asianet[]>(this.url + '/asianetsales');
  }

  getAsianetSalesById(id: number): Observable<Asianet>{
    return this._http.get<Asianet>(this.url + '/asianetsales/' +id);
  }

  updateAsianetSalesCallBack(id: number, data: any): Observable<Asianet>{
    return this._http.patch<Asianet>(this.url + '/asianetsales/callback/' + id, data)
  }

  updateAsianetSalesResponse(id: number, data: any): Observable<Asianet>{
    return this._http.patch<Asianet>(this.url + '/asianetsales/' + id, data)
  }

  addAsianetSalesFollowUp(data: any){
    return this._http.post<Bsnl>(this.url + '/asianetsalesfollow', data)
  }

  getAsianetSalesFollowUp():Observable<FolloeUp[]>{
    return this._http.get<FolloeUp[]>(this.url + '/asianetsalesfollow')
  }

  getAsianetSalesFollowUpById(id: number):Observable<FolloeUp>{
    return this._http.get<FolloeUp>(this.url + '/asianetsalesfollow/' + id)
  }

  updateAsianetSalesFollowupResponse(id: number, data: any): Observable<FolloeUp>{
    return this._http.patch<FolloeUp>(this.url + '/asianetsalesfollow/' + id, data)
  }

  updateAsianetSalesFollowupCallBack(id: number, data: any): Observable<FolloeUp>{
    return this._http.patch<FolloeUp>(this.url + '/asianetsalesfollow/callback/' + id, data)
  }

  // VI
  getVi(): Observable<Vi[]>{
    return this._http.get<Vi[]>(this.url + '/vi');
  }

  getViById(id: number): Observable<Vi>{
    return this._http.get<Vi>(this.url + '/vi/' +id);
  }

  updateViResponse(id: number, data: any): Observable<Vi>{
    return this._http.patch<Vi>(this.url + '/vi/' + id, data)
  }

  updateViCallBack(id: number, data: any): Observable<Vi>{
    return this._http.patch<Vi>(this.url + '/vi/callback/' + id, data)
  }

  addViFollowUp(data: any){
    return this._http.post(this.url + '/vifollowUp', data)
  }

  getViFollowUp():Observable<ViFollowup[]>{
    return this._http.get<ViFollowup[]>(this.url + '/vifollowUp')
  }

  getViFollowUpById(id: number):Observable<ViFollowup>{
    return this._http.get<ViFollowup>(this.url + '/vifollowUp/' + id)
  }

  updateViFollowupResponse(id: number, data: any): Observable<ViFollowup>{
    return this._http.patch<ViFollowup>(this.url + '/vifollowup/' + id, data)
  }

  updateViFollowupCallBack(id: number, data: any): Observable<ViFollowup>{
    return this._http.patch<ViFollowup>(this.url + '/vifollowup/callback/' + id, data)
  }

  // VICOLLECTIONS
  getViCollections(): Observable<Vi[]>{
    return this._http.get<Vi[]>(this.url + '/vicollections');
  }

  getViCollectionsById(id: number): Observable<Vi>{
    return this._http.get<Vi>(this.url + '/vicollections/' +id);
  }

  updateViCollectionsResponse(id: number, data: any): Observable<Vi>{
    return this._http.patch<Vi>(this.url + '/vicollections/' + id, data)
  }

  updateViCollectionsCallBack(id: number, data: any): Observable<Vi>{
    return this._http.patch<Vi>(this.url + '/vicollections/callback/' + id, data)
  }

  addViCollectionFollowUp(data: any){
    return this._http.post<Bsnl>(this.url + '/vicollectionsfollow', data)
  }

  getViCollectionFollowUp():Observable<FolloeUp[]>{
    return this._http.get<FolloeUp[]>(this.url + '/vicollectionsfollow')
  }

  getViCollectionFollowUpById(id: number):Observable<FolloeUp>{
    return this._http.get<FolloeUp>(this.url + '/vicollectionsfollow/' + id)
  }

  updateViCollectionFollowupResponse(id: number, data: any): Observable<FolloeUp>{
    return this._http.patch<FolloeUp>(this.url + '/vicollectionsfollow/' + id, data)
  }

  updateViCollectionFollowupCallBack(id: number, data: any): Observable<FolloeUp>{
    return this._http.patch<FolloeUp>(this.url + '/vicollectionsfollow/callback/' + id, data)
  }

  // FOLLOUP
  addFollowUp(data: any){
    return this._http.post<Bsnl>(this.url + '/followup', data)
  }

  getFollowUp():Observable<FolloeUp[]>{
    return this._http.get<FolloeUp[]>(this.url + '/followup')
  }

  getFollowUpById(id: number):Observable<FolloeUp>{
    return this._http.get<FolloeUp>(this.url + '/followup/' + id)
  }

  updateBsnlFollowupResponse(id: number, data: any): Observable<FolloeUp>{
    return this._http.patch<FolloeUp>(this.url + '/followup/' + id, data)
  }

  updateBsnlFollowupCallBack(id: number, data: any): Observable<FolloeUp>{
    return this._http.patch<FolloeUp>(this.url + '/followup/callback/' + id, data)
  }
}
