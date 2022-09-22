import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { AdminDashboardUserStatsModel } from "../interface/admin.interface";
import { ApiResponse } from "../interface/api.interface";
import { UserDetailedModel, WithdrawModel } from "../interface/user.interface";

@Injectable({
    providedIn: "root",
})
export class AdminService {
    host: string = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getDashboardDetails() {
        return this.http
            .get<ApiResponse<AdminDashboardUserStatsModel>>(
                `${this.host}/admin/user-stats`
            )
            .pipe(map((e) => e.data));
    }

    getProRequestUsers() {
        return this.http
            .get<ApiResponse<{ users: UserDetailedModel }>>(
                `${this.host}/admin/pro-request/users`
            )
            .pipe(map((e) => e.data.users));
    }

    activateProRequestUser(id: string) {
        return this.http
            .patch<ApiResponse<string>>(
                `${this.host}/admin/pro-request/user/${id}/activate`,
                {}
            )
            .pipe(map((e) => e.data));
    }

    getWithdrawRequests() {
        return this.http
            .get<ApiResponse<WithdrawModel[]>>(
                `${this.host}/admin/pro-request/withdraw/requests`
            )
            .pipe(map((e) => e.data));
    }

    acceptWithdrawRequests(id: string) {
        return this.http
            .patch<ApiResponse<string>>(
                `${this.host}/admin/pro-request/withdraw/requests/${id}`,
                {}
            )
            .pipe(map((e) => e.data));
    }
    getSubscriberUsers(){
        return this.http
        .get<ApiResponse<{ users: UserDetailedModel }>>(
            `${this.host}/admin/subscriber-list`
        )
        .pipe(map((e) => e.data));
    }
    getProUsers(){
        return this.http
        .get<ApiResponse<{ users: UserDetailedModel }>>(
            `${this.host}/admin/pro-list`
        )
        .pipe(map((e) => e.data));
    }
    getProEarnings(){
        return this.http
        .get<ApiResponse<{ users: UserDetailedModel }>>(
            `${this.host}/admin/earnings`
        )
    }
    getProfile(id:string){
        console.log('id in service',id)
        return this.http
        .get<ApiResponse<string>>(
            `${this.host}/admin/pro-list/${id}`    
        )
        .pipe(map((e) => e.data));
    }
    getProUser(id:string){
        console.log('id in service',id)
        return this.http.
        get<ApiResponse<string>>(
            `${this.host}/admin/view-profile/${id}`    
        )
        

    }
    updateProfile(profile: any, id: any) {
        return this.http.put<ApiResponse<string>>(
            `${this.host}/admin/update-profile/${id}` , { profile: profile, id: id });
      }
    
    

}
