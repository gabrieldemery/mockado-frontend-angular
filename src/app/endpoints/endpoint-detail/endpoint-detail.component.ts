import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';

// Constantes
import { environment } from '../../../environments/environment'

// Models
import { Endpoint } from '../../models/endpoint.model';
import { Payload } from '../../models/payload.model';

// Services
import { EndpointsService } from '../../services/endpoints.service';

@Component({
  selector: 'app-endpoint-detail',
  templateUrl: './endpoint-detail.component.html'
})
export class EndpointDetailComponent implements OnInit {

  public api: string
  public endpoint: Endpoint = new Endpoint()

  public formEndpoint: FormGroup;
  
  public disabledEdit: boolean = false

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private endpointsService: EndpointsService,
  ) {
    this.api = environment.api

    if(this.route.snapshot.params.id)
      this.endpointsService.getEndpoint(this.route.snapshot.params.id)
        .subscribe((endpoint: Endpoint) => {
          if(endpoint)
            this.endpoint = {...this.endpoint, ...endpoint}
          this.formEndpoint.patchValue({...endpoint});
        })
    else
        this.disabledEdit = true
  }

  ngOnInit() {
    this.formEndpoint = this.formBuilder.group({
      url: ['', [Validators.required, Validators.minLength(2)]],
      requestType: ['', Validators.required],
      delay: [0],
      online: ['', [Validators.required]]
    })

    if (this.endpoint === undefined)
      this.disabledEdit = true
  }

  editEndpoint(){
    this.formEndpoint.patchValue({...this.endpoint});
    this.disabledEdit = true
  }

  cancelEdit(){
    this.disabledEdit = false
    this.formEndpoint.reset()
  }

  validUrl(event: any){
    if(event.keyCode == 193 && this.formEndpoint.value.url.length <= 1)
      return false
  }
  
  onSubmit() {
    this.endpoint = { ...this.formEndpoint.value, id: this.endpoint.id, payloads: this.endpoint.payloads};

    if(this.endpoint.id !== (undefined && null && "")){
      this.endpointsService.putEndpoint(this.endpoint).subscribe( (res: any) => {
        this.disabledEdit = false
      }, (err: any) => {
        console.error("Error", err)
      })
    }else{
      this.endpointsService.postEndpoint(this.endpoint).subscribe( (endpoint: Endpoint) => {
        this.endpoint = endpoint
        this.disabledEdit = false
      }, (err: any) => {
        console.error("Error", err)
      })
    }
  }
  
  deletePayload(payload: Payload){
    this.endpoint.payloads.splice(this.endpoint.payloads.indexOf(payload), 1)
    this.endpointsService.putEndpoint(this.endpoint).subscribe( (res: any) => {}, (err: any) => {
      console.error(err)
    })
  }

}
