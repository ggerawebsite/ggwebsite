import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RapidApiService {

  constructor(
    private http: HttpClient
  ) { }

  getLobbies(platform: string, user: any) {
    console.log(user);
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'd67bebf0e7msh45b81ad05795e32p1d3710jsnbe1c3394a0ac',
      'X-RapidAPI-Host': 'call-of-duty-modern-warfare.p.rapidapi.com'
    });
    return this.http.get<any>(`https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/${user.gamerID}/${platform}`,{ headers});
  }
  getLobbiesForUser(platform: string, gamerId: string) {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'd67bebf0e7msh45b81ad05795e32p1d3710jsnbe1c3394a0ac',
      'X-RapidAPI-Host': 'call-of-duty-modern-warfare.p.rapidapi.com'
    });
    return this.http.get<any>(`https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/${gamerId}/${platform}`,{ headers});
  }
}
