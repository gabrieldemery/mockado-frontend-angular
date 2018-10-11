import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
// Constantes
import { environment } from '../../environments/environment'

// Models
import { Endpoint } from '../models/endpoint.model';

@Injectable()
export class EndpointsService {

  constructor(private http: HttpClient) { }

  getEndpoints(): Observable<Endpoint[]>  {
    return this.http.get<Endpoint[]>(`${environment.api}/endpoints`);
  }

  getEndpoint(id: string): Observable<Endpoint> {
    return this.http.get<Endpoint>(`${environment.api}/endpoints/${id}`);
  }

  postEndpoint(endpoint: Endpoint) {
    return this.http.post<any>(`${environment.api}/endpoints`, endpoint);
  }

  putEndpoint(endpoint: Endpoint) {
    return this.http.put<any>(`${environment.api}/endpoints/${endpoint.id}`, endpoint);
  }

  deleteEndpoint(id: string) {
    return this.http.delete<any>(`${environment.api}/endpoints/${id}`);
  }
}
