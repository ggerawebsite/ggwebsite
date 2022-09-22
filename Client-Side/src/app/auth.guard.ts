import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _auth: HeroService) {}
  canActivate() {
    if (this._auth.isLoggedIn()) return true;
    this._router.navigate(['/login']);
    return false;
  }
  
}
