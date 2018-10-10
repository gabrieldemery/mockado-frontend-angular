import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './login/login.component';
import { EndpointsComponent } from './endpoints/endpoints.component';
import { EndpointDetailComponent } from './endpoints/endpoint-detail/endpoint-detail.component';
import { PayloadComponent } from './endpoints/endpoint-detail/payload/payload.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'endpoints', component: EndpointsComponent },
  { path: 'endpoint', component: EndpointDetailComponent },
  { path: 'endpoint/:id', component: EndpointDetailComponent },
  { path: 'endpoint/:id/payload', component: PayloadComponent },
  { path: '', redirectTo: '/endpoints', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
