import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

// Constantes
import { environment } from '../../../../environments/environment'

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

  private regexBraces = /[^{\}]+(?=})/gm

  public api: string
  public endpoint: Endpoint = new Endpoint()

  public formPayload: FormGroup

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private endpointsService: EndpointsService
  ) {
    this.api = environment.api

    if(this.route.snapshot.paramMap.get('id'))
      this.endpointsService.getEndpoint( this.route.snapshot.paramMap.get('id') )
        .subscribe((endpoint: Endpoint) => {
          if(endpoint)
            this.endpoint = endpoint
            this.checkParams()
        })
  }

  ngOnInit() {
    this.formPayload = this.formBuilder.group({
      params: [{value: '', disabled: true}],
      request: ['', Validators.required],
      response: ['', [Validators.required]]
    });
  }

  checkParams(){
    let count: number = 0
    let params: Object = {}
    this.endpoint.url.match(this.regexBraces).map( (result: string) => {
      params[result] = ""
      count++
    })

    this.formPayload.get('params').setValue(JSON.stringify(params, null, '\t'))

    if(count > 0)
      this.formPayload.get('params').enable()
  }
  
  onSubmit() {
    let payload: Payload = { ... this.formPayload.value };
    
    if( this.endpoint.payloads === undefined )
      this.endpoint.payloads = []

    this.endpoint.payloads.push(payload)
    this.endpointsService.putEndpoint(this.endpoint).subscribe( (res: any) => {
      this.router.navigate(['/endpoint', this.endpoint.id]);
    }, (err: any) => {
      console.error(err)
    })
  }

}
