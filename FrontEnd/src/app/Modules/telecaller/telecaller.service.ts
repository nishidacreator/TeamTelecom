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

@Injectable({
  providedIn: 'root'
})
export class TelecallerService {

  constructor(private _http:HttpClient) { }

  url = 'http://localhost:8000'

  getBsnl(): Observable<Bsnl[]>{
    return this._http.get<Bsnl[]>(this.url + '/bsnl');
  }

  getAsianet(): Observable<Asianet[]>{
    return this._http.get<Asianet[]>(this.url + '/asianet');
  }

  getBajaj(): Observable<Bajaj[]>{
    return this._http.get<Bajaj[]>(this.url + '/bajaj');
  }

  getVi(): Observable<Vi[]>{
    return this._http.get<Vi[]>(this.url + '/vi');
  }

  getBsnlById(id: number): Observable<Bsnl>{
    return this._http.get<Bsnl>(this.url + '/bsnl/' +id);
  }

  getAsianetById(id: number): Observable<Asianet>{
    return this._http.get<Asianet>(this.url + '/asianet/' +id);
  }

  getBajajById(id: number): Observable<Bajaj>{
    return this._http.get<Bajaj>(this.url + '/bajaj/' +id);
  }

  getViById(id: number): Observable<Vi>{
    return this._http.get<Vi>(this.url + '/vi/' +id);
  }

  updateBsnlResponse(id: number, data: any): Observable<Bsnl>{
    return this._http.patch<Bsnl>(this.url + '/bsnl/' + id, data)
  }

  updateAsianetResponse(id: number, data: any): Observable<Asianet>{
    return this._http.patch<Asianet>(this.url + '/asianet/' + id, data)
  }

  updateBajajResponse(id: number, data: any): Observable<Bajaj>{
    return this._http.patch<Bajaj>(this.url + '/bajaj/' + id, data)
  }

  updateViResponse(id: number, data: any): Observable<Vi>{
    return this._http.patch<Vi>(this.url + '/vi/' + id, data)
  }

  updateBsnlCallBack(id: number, data: any): Observable<Bsnl>{
    return this._http.patch<Bsnl>(this.url + '/bsnl/callback/' + id, data)
  }

  updateAsianetCallBack(id: number, data: any): Observable<Asianet>{
    return this._http.patch<Asianet>(this.url + '/asianet/callback/' + id, data)
  }

  updateBajajCallBack(id: number, data: any): Observable<Bajaj>{
    return this._http.patch<Bajaj>(this.url + '/bajaj/callback/' + id, data)
  }

  updateViCallBack(id: number, data: any): Observable<Vi>{
    return this._http.patch<Vi>(this.url + '/vi/callback/' + id, data)
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

  addAsianetFollowUp(data: any){
    return this._http.post(this.url + '/asianetfollowUp', data)
  }

  getAsianetFollowUp():Observable<AsianetFollowup[]>{
    return this._http.get<AsianetFollowup[]>(this.url + '/asianetfollowUp')
  }

  getAsianetFollowUpById(id: number):Observable<AsianetFollowup>{
    return this._http.get<AsianetFollowup>(this.url + '/asianetfollowUp/' + id)
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

  addViFollowUp(data: any){
    return this._http.post(this.url + '/vifollowUp', data)
  }

  getViFollowUp():Observable<ViFollowup[]>{
    return this._http.get<ViFollowup[]>(this.url + '/vifollowUp')
  }

  getViFollowUpById(id: number):Observable<ViFollowup>{
    return this._http.get<ViFollowup>(this.url + '/vifollowUp/' + id)
  }

  updateBsnlFollowupResponse(id: number, data: any): Observable<FolloeUp>{
    return this._http.patch<FolloeUp>(this.url + '/followup/' + id, data)
  }

  updateAsianetFollowupResponse(id: number, data: any): Observable<AsianetFollowup>{
    return this._http.patch<AsianetFollowup>(this.url + '/asianetfollowup/' + id, data)
  }

  updateBajajFollowupResponse(id: number, data: any): Observable<BajajFollowup>{
    return this._http.patch<BajajFollowup>(this.url + '/bajajfolllowup/' + id, data)
  }

  updateViFollowupResponse(id: number, data: any): Observable<ViFollowup>{
    return this._http.patch<ViFollowup>(this.url + '/vifollowup/' + id, data)
  }

  updateBsnlFollowupCallBack(id: number, data: any): Observable<FolloeUp>{
    return this._http.patch<FolloeUp>(this.url + '/followup/callback/' + id, data)
  }

  updateAsianetFollowupCallBack(id: number, data: any): Observable<AsianetFollowup>{
    return this._http.patch<Asianet>(this.url + '/asianetfollowup/callback/' + id, data)
  }

  updateBajajFollowupCallBack(id: number, data: any): Observable<BajajFollowup>{
    return this._http.patch<Bajaj>(this.url + '/bajajfollowup/callback/' + id, data)
  }

  updateViFollowupCallBack(id: number, data: any): Observable<ViFollowup>{
    return this._http.patch<Vi>(this.url + '/vifollowup/callback/' + id, data)
  }
}
