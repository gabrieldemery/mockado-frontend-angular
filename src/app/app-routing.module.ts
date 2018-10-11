import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Middlewares
import { AuthGuard } from './middlewares/auth.guard';

// Components
import { LoginComponent } from './login/login.component';
import { EndpointsComponent } from './endpoints/endpoints.component';
import { EndpointDetailComponent } from './endpoints/endpoint-detail/endpoint-detail.component';
import { PayloadComponent } from './endpoints/endpoint-detail/payload/payload.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'endpoints', component: EndpointsComponent, canActivate: [AuthGuard] },
  { path: 'endpoint', component: EndpointDetailComponent, canActivate: [AuthGuard] },
  { path: 'endpoint/:id', component: EndpointDetailComponent, canActivate: [AuthGuard] },
  { path: 'endpoint/:id/payload', component: PayloadComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/endpoints', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
