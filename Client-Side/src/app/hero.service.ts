import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode"
import { environment } from 'src/environments/environment';
import { PartyModel } from './common/interface/party.interface';
import { ApiResponse } from './common/interface/api.interface';
import { PreferenceModel, UserDetailedModel, UserModel } from './common/interface/user.interface';
import {map, Observable} from 'rxjs'; 
import { OptResponse } from './common/interface/otp.interface';


interface MyToken {
  role: string;
  email: string;
  superAdmin: string;

  // whatever else is in the JWT.
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // server_address: string = "http://localhost:8887/api"
  server_address: string = environment.apiUrl;
  // server_address: string = '/api';


  constructor(private http: HttpClient) { }

  //! Token related

  //Admin Role Check
  isPro(): boolean {
    var token = localStorage.getItem('accessToken') || '';
    var user = jwt_decode<MyToken>(token);
    return user.role === 'professional' ? true : false;
  }

  //SuperAdmin Role Check
  isSuperAdmin(): boolean {
    var token = localStorage.getItem('accessToken') || '';
    var user = jwt_decode<MyToken>(token);
    return user.superAdmin === 'super' ? true : false;
  }
  //normal Role Check
  isNormal(): boolean {
    var token = localStorage.getItem('accessToken') || '';
    var user = jwt_decode<MyToken>(token);
    return user.role === 'normal' ? true : false;
  }

  //email Role Check
  getEmail() {
    var token = localStorage.getItem('accessToken') || '';
    var user = jwt_decode<MyToken>(token);
    return user.email;
  }

  //check Presence of Token  
  isLoggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  //retrive Token for token interception
  getToken() {
    return localStorage.getItem('accessToken')
  }





  //!Signup related

  signupGo(data: any) {
    return this.http.post<any>(`${this.server_address}/auth/signUp`, data);
  }
  discordSign() {
    return this.http.get<any>(`${this.server_address}/auth/discordStart`);
  }

  googleSave(data: any) {
    return this.http.post<any>(`${this.server_address}/auth/googleSave`, data);
  }

  OTPGo(data: any, email: string) {
    return this.http.post<OptResponse>(`${this.server_address}/auth/verifyOTP`, { data, email });
  }

  //! Stripe related 

  // makePayment(stripeToken: any) {
  //   return this.http.post<any>(`${this.server_address}/stripe`, { token: stripeToken });
  // }
  addMoney(data: any, amount: number) {
    return this.http.put<any>(`${this.server_address}/stripe`, { data, amount });
  }

  newStripe(data:any){
    return this.http.post<any>(`${this.server_address}/stripe`,{data});
  }


  //!User related

  reqPro(email: any) {
    return this.http.post<any>(`${this.server_address}/reqPro`, { email: email });
  }
  
  updatePreference(preference: PreferenceModel) {
    return this.http.patch<ApiResponse<string>>(`${this.server_address}/user/preference`, preference);
  }



  //! coaching related 

  coach(email: any, pro_id: any) {
    return this.http.post<any>(`${this.server_address}/coach`, { email: email, pro_id: pro_id });

  }

  getCoach(id: any) {
    return this.http.get<any>(`${this.server_address}/proplayer/${id}/coach`);
  }
  coachingGo(data: any, email: any) {
    return this.http.post<any>(`${this.server_address}/proplayer/coaching`, { data: data, email: email });
  }

  getCoachingList() {
    return this.http.get<any>(`${this.server_address}/proplayer/coaching-requests`,);
  }
  getReq() {
    return this.http.get<any>(`${this.server_address}/proplayer/reqPro`);
  }

  //! Party related 
  partyGo(data: any, email: any) {
    return this.http.post<any>(`${this.server_address}/party`, { data: data, email: email });
  }

  getParty() {
    return this.http.get<PartyModel[]>(`${this.server_address}/party`,);
  }
  getAllParty() {
    return this.http.get<PartyModel[]>(`${this.server_address}/party/all`,);
  }
  getAllPartyWithQuery(query) {
    return this.http.get<PartyModel[]>(`${this.server_address}/party/all/query?${query}`);
  }

  getPartyDetails(id: string) {
    return this.http.get<ApiResponse<PartyModel>>(`${this.server_address}/party/${id}/details`).pipe(map(e=>e.data));
  }

  startParty(id: string) {
    return this.http.patch<ApiResponse<any>>(`${this.server_address}/party/${id}/start`, {});
  }

  stopParty(id: string) {
    return this.http.patch<ApiResponse<any>>(`${this.server_address}/party/${id}/stop`, {});
  }

  savePartyMemberTime(id: string, data: Record<string, string>) {
    return this.http.patch<ApiResponse<any>>(`${this.server_address}/party/${id}/member-time`, data)
  }

  getChannelFromParty(id: string) {
    return this.http.get<ApiResponse<UserDetailedModel>>(`${this.server_address}/party/${id}/channel`);
  }

  getMyParties() {
    return this.http.get<PartyModel[]>(`${this.server_address}/party/my`,);
  }

  canCreateParty() {
    return this.http.get<boolean>(`${this.server_address}/party/can-create`,);
  }

  createParty(data: any) {
    const token = this.getToken();
    return this.http.post<any>(`${this.server_address}/party`,data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  joinParty(id: any) {
    console.log("id", id)
    return this.http.post<any>(`${this.server_address}/proplayer/joinparty`, { id });
  }

  addUserToParty(partyId: string) {
    return this.http.patch<ApiResponse<PartyModel>>(`${this.server_address}/party/${partyId}/add-user`, {});
  }



  //! Pro related 

  sendLinkApprove(id: any, pro_id: any, sub_id: any) {
    return this.http.post<any>(`${this.server_address}/proplayer/sendLink_approve`, { id: id, pro_id: pro_id, sub_id: sub_id });
  }

  sendLinkReject(id: any) {
    return this.http.post<any>(`${this.server_address}/proplayer/sendLink_reject`, { id });
  }

  getProId(id: any) {
    return this.http.post<any>(`${this.server_address}/proplayer/pro`, { id });

  }


  //! User related 
  getAllUsers() {
    return this.http.get<any>(`${this.server_address}/user/all`);
  }

  getUserById(id: any) {
    return this.http.get<any>(`${this.server_address}/user/single/${id}`);
  }
  getUserDetail(data: any) {
    return this.http.post<any>(`${this.server_address}/user`, { data });

  }
  getMyDetail(): Observable<ApiResponse<UserDetailedModel>> {
    return this.http.get<ApiResponse<UserDetailedModel>>(`${this.server_address}/user/my/details`);
  }

  searchUsers(query) {
    return this.http.get<any>(`${this.server_address}/proplayer/user`, {
      params: { q: query }
    })
  }

  withdrawAmount(amount: number) {
    return this.http.post<ApiResponse<string>>(`${this.server_address}/user/withdraw`, {
      amount
    })
  }

  //* Profile 
  updateProfile(profile: any, email: any) {
    return this.http.put<any>(`${this.server_address}/user`, { profile: profile, email: email });
  }
  changeStatus(status: string, userId: string) {
    return this.http.patch<any>(`${this.server_address}/user/change/status`, { status: status, userId: userId });
  }

  //! Chat related 

  getchatlist(email: any) {
    return this.http.post<any>(`${this.server_address}/chatLists`, email)

  }


  //! Game Api

  getAllGames() {
    return this.http.get(`${this.server_address}/game`)
  }
  
  getSubscriptionData(){
   return this.http.get(`${this.server_address}/subscription/get`)
  }
  proRequestHandler(){
    return this.http.post(`${this.server_address}/reqPro`,{})
  }


}
