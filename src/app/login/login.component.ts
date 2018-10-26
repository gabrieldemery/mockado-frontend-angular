import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      login: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value);
    }
    
  }

}
