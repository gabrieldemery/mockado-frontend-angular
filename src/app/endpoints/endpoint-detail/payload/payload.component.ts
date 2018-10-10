import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { Endpoint } from '../../../models/endpoint.model';
import { Payload } from '../../../models/payload.model';

// Services
import { EndpointsService } from '../../../services/endpoints.service';

@Component({
  selector: 'app-payload',
  templateUrl: './payload.component.html'
})
export class PayloadComponent implements OnInit {

  endpoint: Endpoint

  formPayload: FormGroup

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private endpointsService: EndpointsService
  ) {
    //this.emptyEndpoint()
    
    if(this.route.snapshot.paramMap.get('id'))
      this.endpointsService.getEndpoint( this.route.snapshot.paramMap.get('id') )
        .subscribe((endpoint: Endpoint) => {
          if( endpoint !== undefined )
            this.endpoint = endpoint
            console.log(endpoint)
        })
  }

  ngOnInit() {
    this.formPayload = this.formBuilder.group({
      params: [''],
      request: ['', Validators.required],
      response: ['', [Validators.required]]
    });
  }

  /* private emptyEndpoint(){
    this.endpoint = {
      url: 'Teste',
      requestType: 'GET',
      online: true
    }
  } */
  
  onSubmit() {
    let payload: Payload = { ... this.formPayload.value };

    console.log("OnSubmit", payload)
    
    if( this.endpoint.payloads === undefined )
      this.endpoint.payloads = []

    this.endpoint.payloads.push(payload)
    this.endpointsService.putEndpoint(this.endpoint).subscribe( (res: any) => {
      console.log(res)
      this.router.navigate(['/endpoint', this.endpoint.id]);
    }, (err: any) => {
      console.error(err)
    })
  }

}
