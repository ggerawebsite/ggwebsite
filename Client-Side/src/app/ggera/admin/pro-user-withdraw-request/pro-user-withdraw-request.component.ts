import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/common/service/admin.service";
import { Observable, tap } from "rxjs";
import Swal from "sweetalert2";

@Component({
    selector: "app-pro-user-withdraw-request",
    templateUrl: "./pro-user-withdraw-request.component.html",
    styleUrls: ["./pro-user-withdraw-request.component.scss"],
})
export class ProUserWithdrawRequestComponent implements OnInit {
    withdrawRequest$: Observable<any>;
    constructor(private adminService: AdminService) {}

    ngOnInit(): void {
        this.updateRequest();
    }

    updateRequest() {
        this.withdrawRequest$ = this.adminService.getWithdrawRequests();
    }

    approveRequest(id: string) {
        this.adminService
            .acceptWithdrawRequests(id)
            .pipe(
                tap(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Request Accepted",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.updateRequest();
                })
            )
            .subscribe();
    }
}
