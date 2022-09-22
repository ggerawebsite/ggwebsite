import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroService } from 'src/app/hero.service';

@Injectable({
  providedIn: 'root'
})
export class ProUserGuard implements CanActivate {
  constructor(private heroService: HeroService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.heroService.isPro();
  }
  
}
