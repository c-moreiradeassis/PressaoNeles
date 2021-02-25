import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partido } from '../_models/Partido';

@Injectable({
  providedIn: 'root',
})
export class PartidoService {
  baseURL = 'http://localhost:5000/partido';

  constructor(private http: HttpClient) {}

  getAllPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(this.baseURL);
  }

  postPartido(partido: Partido) {
    return this.http.post(this.baseURL, partido);
  }

  putPartido(partido: Partido) {
    return this.http.put(`${this.baseURL}/${partido.id}`, partido);
  }

  deletePartido(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
