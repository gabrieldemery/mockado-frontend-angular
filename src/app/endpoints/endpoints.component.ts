import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

// Constantes
import { environment } from '../../environments/environment'

// Models
import { Endpoint } from '../models/endpoint.model'

// Services
import { EndpointsService } from '../services/endpoints.service'

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html'
})
export class EndpointsComponent implements OnInit {

  public api: string
  public endpoints: Endpoint[] = []

  constructor(
    private router: Router,
    private endpointsService: EndpointsService
  ) {
    this.api = environment.api
  }

  ngOnInit() {
    this.endpointsService.getEndpoints()
      .subscribe( (endpoints: Endpoint[]) => {
        this.endpoints = endpoints

        if(this.endpoints.length <= 0)
          this.router.navigate(['/endpoint'])
      })
  }

  public checkOnline(endpoint: Endpoint): string {
    if(endpoint.online)
      return "On"
    
    return "Off"
  }
  
  deleteEndpoint(endpoint: Endpoint){
    this.endpointsService.deleteEndpoint(endpoint.id).subscribe( (r: any) => {
      this.endpoints = this.endpoints.filter( (e: Endpoint) => e.id != endpoint.id )
    })
  }

}
