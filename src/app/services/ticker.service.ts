import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PortfolioDto, TransactionDto } from '../models/portfolio';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TickerService {
  constructor(private http: HttpClient) {}

  getPorfolioDetails(): Observable<PortfolioDto> {
    return this.http.get<PortfolioDto>(
      environment.serviceUrl + 'GetPortfolioDetails'
    ).pipe(
       catchError(this.handleErrorObservable)
    );
  }


   buyOrSellStocks( CreateTransactionDto: any) :Observable<TransactionDto>{


    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });

    return this.http.post<TransactionDto>(environment.serviceUrl + "BuyOrSellStock", CreateTransactionDto, { headers: httpHeaders }).pipe(
      map(this.extractData),
      catchError(this.handleErrorObservable)
    );
  }


  private extractData(res: any): any {
    let body = res;
    return body;
  }
  private handleErrorObservable(error: any) {
   // this.snackBar.open("Error : " + error.message, "",{duration: 5000});
    console.error(error.message || error);
    return throwError(error);
  }
}
