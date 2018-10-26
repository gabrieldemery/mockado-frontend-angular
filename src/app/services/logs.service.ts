import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

// Constantes
import { environment } from '../../environments/environment'

// Models
import { Log } from '../models/log.model';

@Injectable()
export class LogsService {

  constructor(private http: HttpClient) { }

  getLogs(): Observable<Log[]>  {
    return this.http.get<Log[]>(`${environment.api}/logs`);
  }
}
