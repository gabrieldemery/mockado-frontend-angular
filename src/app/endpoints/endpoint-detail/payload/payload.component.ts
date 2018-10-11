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

    if (this.route.snapshot.paramMap.get('id'))
      this.endpointsService.getEndpoint(this.route.snapshot.paramMap.get('id'))
        .subscribe((endpoint: Endpoint) => {
          if (endpoint)
            this.endpoint = endpoint
          this.checkParams()
        })
  }

  ngOnInit() {
    this.formPayload = this.formBuilder.group({
      params: [{ value: '', disabled: true }],
      request: ['', Validators.required],
      response: ['', [Validators.required]]
    });
  }

  checkParams() {
    let count: number = 0
    let params: Object = {}
    this.endpoint.url.match(this.regexBraces).map((result: string) => {
      params[result] = ""
      count++
    })

    this.formPayload.get('params').setValue(JSON.stringify(params, null, '\t'))

    if (count > 0)
      this.formPayload.get('params').enable()
  }

  onSubmit() {
    let payload: Payload = new Payload()

    // Params
    if (this.isJSON(this.formPayload.value.params))
      payload.params = JSON.stringify(JSON.parse(this.formPayload.value.params))

    // Request Body
    if (this.isJSON(this.formPayload.value.request))
      payload.request = this.stringifyJSON(this.formPayload.value.request)
    //else if (this.isXML(this.formPayload.value.request))
      //payload.request = this.stringifyXML(this.formPayload.value.request)
    else
      payload.request = this.formPayload.value.request

    // Response Body
    if (this.isJSON(this.formPayload.value.response))
      payload.response = this.stringifyJSON(this.formPayload.value.response)
    //else if (this.isXML(this.formPayload.value.response))
      //payload.response = this.stringifyXML(this.formPayload.value.response)
    else
      payload.response = this.formPayload.value.response

    if (this.endpoint.payloads === undefined)
      this.endpoint.payloads = []

    this.endpoint.payloads.push(payload)
    this.endpointsService.putEndpoint(this.endpoint).subscribe((res: any) => {
      this.router.navigate(['/endpoint', this.endpoint.id]);
    }, (err: any) => {
      console.error(err)
    })
  }

  isJSON(str: string): boolean {
    try {
      let doc = JSON.parse(str)
      return true;
    } catch (err) {
      console.error(err)
      return false;
    }
  }

  stringifyJSON(str: string): string{
    return JSON.stringify(JSON.parse(str))
  }

  isXML(str: string): boolean {
    try {
      let doc = (new DOMParser()).parseFromString(str, "text/xml")
      return true;
    } catch (err) {
      console.error(err)
      return false;
    }
  }

  stringifyXML(str: string): string{
    return (new XMLSerializer()).serializeToString((new DOMParser()).parseFromString(str, "text/xml"))
  }

}
