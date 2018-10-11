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
  eid: string

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn
    this.eid = localStorage.getItem('eid') || ''
  }

  onLogout(){
    this.authService.logout()
  }
}