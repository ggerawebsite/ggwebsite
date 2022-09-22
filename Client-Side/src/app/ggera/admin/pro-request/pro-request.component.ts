import { Component, OnInit } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AdminService } from "src/app/common/service/admin.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-pro-request",
    templateUrl: "./pro-request.component.html",
    styleUrls: ["./pro-request.component.scss"],
})
export class ProRequestComponent implements OnInit {
    proUsers$: Observable<any>;
    constructor(private adminService: AdminService) {}

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.proUsers$ = this.adminService.getProRequestUsers();
    }

    activateUser(id: string) {
        this.adminService
            .activateProRequestUser(id)
            .pipe(
                tap((e) => {
                    Swal.fire({
                        icon: "success",
                        title: "Activated successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        this.getUsers();
                    });
                })
            )
            .subscribe();
    }
}
