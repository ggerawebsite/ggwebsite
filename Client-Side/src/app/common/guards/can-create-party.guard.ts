import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Observable, tap } from "rxjs";
import { HeroService } from "src/app/hero.service";
import Swal from 'sweetalert2';

@Injectable({
    providedIn: "root",
})
export class CanCreatePartyGuard implements CanActivate {
    constructor(private heroService: HeroService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.heroService.canCreateParty().pipe(tap(e => {
          if(!e) {
            Swal.fire({
              icon: 'error',
              title: 'Please enter twitch channel and discord if before creating a party',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/profile'])
            })
          } 
        }));
    }
}
