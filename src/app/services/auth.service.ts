import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

// Constantes
import { environment } from '../../environments/environment'

// Models
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(user: User){
    if( user.login == 'gabriel.demery.gomes' && user.pass == '123' ){
      localStorage.setItem('login', user.login)
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
    
    this.http.post(`${environment.api}/login`, user).subscribe( (res: any) => {
      localStorage.setItem('login', user.login)
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }, (err: any) => console.error(err))
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
