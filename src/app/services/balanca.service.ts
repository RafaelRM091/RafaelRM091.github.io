import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Balanca } from '../models/balanca';


@Injectable({
  providedIn: 'root'
})
export class BalancaService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar) { }

  findAll():Observable<Balanca[]> {
    const url = this.baseUrl + "/balancas";
    return this.http.get<Balanca[]>(url);
  }
  
  findById(id: any):Observable<Balanca> {
    const url = `${this.baseUrl}/balancas/${id}`;
    return this.http.get<Balanca>(url);
  }

  create(balanca: Balanca):Observable<Balanca> {
    const url = this.baseUrl + "/balancas";
    return this.http.post<Balanca>(url, balanca);
  }

  update(balanca: Balanca):Observable<Balanca> {
    const url = `${this.baseUrl}/balancas/${balanca.id}`;
    return this.http.put<Balanca>(url, balanca);
  }

  delete(id : any):Observable<void> {
    const url = `${this.baseUrl}/balancas/${id}`;
    return this.http.delete<void>(url);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000,
      panelClass: ['green-snackbar']
    })
  }
}
