import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deputado } from '../_models/Deputado';

@Injectable({
  providedIn: 'root',
})
export class DeputadoService {
  baseURL = 'http://localhost:5000/deputado';

  constructor(private http: HttpClient) {}
  getDeputados(): Observable<Deputado[]> {
    return this.http.get<Deputado[]>(this.baseURL);
  }

  postDeputado(deputado: Deputado) {
    return this.http.post(this.baseURL, deputado);
  }

  putDeputado(deputado: Deputado) {
    return this.http.put(`${this.baseURL}/${deputado.id}`, deputado);
  }

  deleteDeputado(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
