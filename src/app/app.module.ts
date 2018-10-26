import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Services
import { AuthService } from './services/auth.service';
import { EndpointsService } from './services/endpoints.service';
import { LogsService } from './services/logs.service';

// Components
import { AppComponent } from './app.component';
import { EndpointsComponent } from './endpoints/endpoints.component';
import { EndpointDetailComponent } from './endpoints/endpoint-detail/endpoint-detail.component';
import { LoginComponent } from './login/login.component';
import { PayloadComponent } from './endpoints/endpoint-detail/payload/payload.component';
import { LogsComponent } from './logs/logs.component';

@NgModule({
  declarations: [
    AppComponent,
    EndpointsComponent,
    EndpointDetailComponent,
    LoginComponent,
    PayloadComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    EndpointsService,
    LogsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
