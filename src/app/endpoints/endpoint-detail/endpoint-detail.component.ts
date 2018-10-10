import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  public formEndpoint: FormGroup;

  public api: string
  public endpoint: Endpoint = new Endpoint()

  public edit: boolean = false

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
            this.endpoint = endpoint
            this.formEndpoint.patchValue({...endpoint});
        })
    else
        this.edit = true
  }

  ngOnInit() {
    this.formEndpoint = this.formBuilder.group({
      url: ['', [Validators.required, Validators.minLength(2)]],
      requestType: ['', Validators.required],
      delay: [0],
      online: ['', [Validators.required]]
    })

    if (this.endpoint === undefined)
      this.edit = true
    
    //this.loadData()
  }

 /*  private emptyEndpoint(){
    this.endpoint = {
      url: '',
      requestType: 'GET',
      online: true,
      delay: 0
    }
  } */

  

  /* loadData(){
    for(var attr in this.endpoint){
      if( attr == "online" )
        this.formEndpoint.get(attr).setValue(this.checkOnline())
      else
        this.formEndpoint.get(attr).setValue(this.endpoint[attr])
    }
  } */

  editData(edit: boolean) {
    this.edit = edit;
  }

  cancelEdit(){
    this.edit = false
    this.formEndpoint.reset()
  }
  
  onSubmit() {
    this.endpoint = { ... this.formEndpoint.value };

    console.log("OnSubmit", this.endpoint)

    if(this.endpoint.id !== (undefined && NaN && null && "")){
      this.endpointsService.putEndpoint(this.endpoint)
    }else{
      this.endpointsService.postEndpoint(this.endpoint)
        .subscribe( (endpoint: Endpoint) => { this.endpoint = endpoint })
    }
  }
  
  deletePayload(payload: Payload){
    this.endpoint.payloads.splice(this.endpoint.payloads.indexOf(payload), 1)
    this.endpointsService.putEndpoint(this.endpoint).subscribe( (res: any) => {
      console.log(res)
    }, (err: any) => {
      console.error(err)
    })
  }

}
