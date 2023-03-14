import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Beer } from '../model/beer';
import { BeerAddition } from '../model/beerAddition';
import { BeerRemoval } from '../model/beerRemoval';
import { CreditTransfer } from '../model/creditTransfer';
import { UserCredits } from '../model/userCredits';
import { ExplainationResult } from '../model/ExplainationResult';


@Injectable({
  providedIn: 'root'
})
export class FridgeService {


  constructor(private http: HttpClient) {
  }

  getCreditsForCurrentUser(user: string): Observable<number> {
    return this.http.get<number>(`${AppConfig.settings.apiUrl}/credit/${user}`);
  }

  getCurrentBeers(): Observable<Array<Beer>>{
    return this.http.get<Array<Beer>>(`${AppConfig.settings.apiUrl}/beer`).map(beers => beers.filter(b => b.removedBy == null));
  }

  getUserBeers(user: string): Observable<Array<Beer>>{
    return this.http.get<Array<Beer>>(`${AppConfig.settings.apiUrl}/beer`).map(beers => beers.filter(b => b.createdBy === user && b.removedBy == null));
  }

  getHistoricalBeers(): Observable<Array<Beer>>{
    return this.http.get<Array<Beer>>(`${AppConfig.settings.apiUrl}/beer`).map(beers => beers.filter(b => b.removedBy != null));
  }

  explainBeer(beer: Beer) {
    return this.http.get<ExplainationResult>(`${AppConfig.settings.apiUrl}/beer/${beer.id}/explain`);
  }

  addBeer(beer: BeerAddition): Observable<void>{
    return this.http.post<void>(`${AppConfig.settings.apiUrl}/beeraddition`, beer);
  }

  takeBeer(beerRemoval: BeerRemoval): Observable<void>{
    return this.http.post<void>(`${AppConfig.settings.apiUrl}/beerremoval`, beerRemoval);
  }

  transferCredit(creditTransfer: CreditTransfer): Observable<void>{
    return this.http.post<void>(`${AppConfig.settings.apiUrl}/credittransfer`, creditTransfer);
  }

  getFridgeUsers(): Observable<Array<string>>{
    return this.http.get<Array<string>>(`${AppConfig.settings.apiUrl}/user`);
  }

  getUserCredits(): Observable<Array<UserCredits>>{
    return this.http.get<Array<UserCredits>>(`${AppConfig.settings.apiUrl}/credit`);
  }
}
