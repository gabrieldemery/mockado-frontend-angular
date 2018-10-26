import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>
  login: string

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn
    this.login = localStorage.getItem('login') || ''
  }

  onLogout(){
    this.authService.logout()
  }
}